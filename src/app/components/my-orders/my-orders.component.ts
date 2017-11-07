import { AuthService } from '../../services/auth.service';

import { OrderService } from '../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$;

  constructor(
    private orderService: OrderService,
    private authUser: AuthService
  
  ) {

    this.orders$ = authUser.user$.switchMap(u => orderService.getOrdersByUser(u.uid));

   }

  ngOnInit() {
  }

}
