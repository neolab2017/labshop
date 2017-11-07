import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {

  @Input('product') product;
 
  @Input('shopping-cart') shoppingCart;
 
   constructor(private cartService: ShoppingCartService) { }
 
   addToCart (){
     this.cartService.addToCard(this.product);
   }
 
   removeFromCart () {
 
     this.cartService.removeFromCart(this.product);
 
   }


 

}
