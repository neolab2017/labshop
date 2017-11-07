import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';
import { async } from '@angular/core/testing';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

 private create () {
   return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
    
  }

   async getCart(): Promise<FirebaseObjectObservable<ShoppingCart>>{
   
    let cartId =  await this.getOrCreateCartID()
    return this.db.object('/shopping-carts/'+ cartId);

  };


  async getCartOrder(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartID();
    return this.db.object('/shopping-carts/' + cartId)
      .map(x => new ShoppingCart(x.items));
  }
  

  private getItem(cartId: string, productId: string) {
   return  this.db.object('/shopping-carts/'+ cartId + '/items/' + productId);

  };

  private async getOrCreateCartID () : Promise<string> {
   

    let cartID=localStorage.getItem('cartId');
    
    if(!cartID){
      let result = await this.create();
      localStorage.setItem('cartId', result.key)
      return result.key;      

    } 
      return cartID;
  };


  async addToCard(product) {    

  this.updateItemQ(product, 1)
  
  }

  removeFromCart (product) {

    this.updateItemQ(product, -1)

  }

  private async updateItemQ (product, change:number) {   
   
    let cart = await this.getOrCreateCartID();
    let key = product.$key ? product.$key : product
    let items$= this.getItem(cart, key);

    items$.take(1).subscribe(item => {

      let quant = (item.quantity || 0) + change;

      if (quant === 0 ){      
        this.deleteItem(item.$key);   
            };

      if (item.$exists()) {

        items$.update({quantity:  quant}) 
      } else {

        items$.set({product: product, quantity: 1})        
      }

    })

  }


  private async deleteItem (item) {
    let id =  await this.getOrCreateCartID()
    this.db.object('/shopping-carts/' + id + '/items/' + item).remove();    
  }

  async claerCart () {

    let id =  await this.getOrCreateCartID()
    this.db.object('/shopping-carts/' + id + '/items').remove();

  }

}
