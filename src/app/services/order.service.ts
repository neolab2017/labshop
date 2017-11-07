import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private shopServ: ShoppingCartService ) { }

  async storeorder (order) {
    let res = await this.db.list('/orders').push(order);
    this.shopServ.claerCart();
    return res;
  }

  getOrders() {
    return this.db.list('/orders');
  }

  getOrdersByUser (userId: string){
    return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
        equalTo: userId
      }
    })
  }

}
