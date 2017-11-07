import { ShoppingCartService } from '../../services/shopping-cart.service';
import { AppUser } from '../../models/app-user';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit, OnDestroy  } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/Observable/of';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit  {

 isAdmin: boolean;
 shoppingCardCount: number


  constructor(
    public auth: AuthService, 
    private UserService:UserService,
    private shoppingCartSer: ShoppingCartService
  
  ) {     
   
   }

   async ngOnInit () {
    
    this.auth.user$.subscribe(user => {
      if(user) {
        this.UserService.get(user.uid).subscribe(user => {        
          this.isAdmin=user.isAdmin          
        });
      }  else {
        return Observable.of(null)
      }      
    }) 
    
    let cart =  await  this.shoppingCartSer.getCart();

    cart.subscribe(cart => {
    
      this.shoppingCardCount=0;

      for(let id in cart.items ){
       
        this.shoppingCardCount += cart.items[id].quantity
      }   
    })
    
      }   

  LogOut () {

    this.auth.logout();

  }



}
