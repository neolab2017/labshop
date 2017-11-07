import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/product';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {   

  
  cart$: Observable<ShoppingCart>;

s
  

  constructor (    
    private shopCardServ: ShoppingCartService
    ) {

  }

  async ngOnInit () {
    this.cart$ = await this.shopCardServ.getCartOrder();  
     
    
    };
 
  }

  

  
  

