import { Product } from '../../models/product';
import { ShoppingCartItem } from '../../models/shopping-cart-item';
import { async } from '@angular/core/testing';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {

  productlist: Object = {};
  keyproductlist: any[] = [];
  cardSumm: number 
  totalSumm: number
  test:number

  items: ShoppingCartItem[] =[];


  constructor( 
    
    private shoppingcardService: ShoppingCartService    
  ) { 
  
   }

async  ngOnInit() {

   (await  this.shoppingcardService.getCart()).subscribe(
     cart=>{

        this.productlist=cart.items;
       
        this.keyproductlist = this.productlist?  Object.keys(this.productlist) : [];
        this.cardSumm = 0;
        this.totalSumm=0;

        for (let item in cart.items ) {    
          
          this.cardSumm +=  this.productlist[item].quantity;
          this.totalSumm += this.productlist[item].product.price * cart.items[item].quantity       
         
        }  
 
     } 
   )  

  }



  addToCart (product){  
    this.shoppingcardService.addToCard(product);
  }

  removeFromCart (product) {
    this.shoppingcardService.removeFromCart(product);

  }

  clearCart () {

    this.shoppingcardService.claerCart();





  }

}
