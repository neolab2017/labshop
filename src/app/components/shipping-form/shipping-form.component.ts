import { ShoppingCart } from '../../models/shopping-cart';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../../models/order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: ShoppingCart;

  shipping = {};
  userId: string;
  usersub: Subscription

  constructor (    
    private shopCardServ: ShoppingCartService, 
    private orderService: OrderService, 
    private authServ: AuthService,  
    private router: Router  
  ) {

  }

  ngOnInit() {

    this.usersub=this.authServ.user$.subscribe(user => {
      return  this.userId=user.uid
      })
  }

  ngOnDestroy () {   
       
        this.usersub.unsubscribe();
        
      };  


  async placeOrder() {    
    
     let order = new Order(this.userId, this.shipping, this.cart);
     let res = await this.orderService.storeorder(order)   
     this.router.navigate(['/order-success', res.key])
    }  

}
