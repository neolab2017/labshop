import { OrderService } from './services/order.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { LoginComponent } from './components/login/login.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ShoppingCardComponent } from './components/shopping-card/shopping-card.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2'
import {AngularFireDatabaseModule} from 'angularfire2/database'
import {AngularFireAuthModule} from 'angularfire2/auth'
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import {RouterModule} from '@angular/router'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { CustomFormsModule } from 'ng2-validation';
import {DataTableModule} from 'angular-4-data-table';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';



@NgModule({
  declarations: [
    AppComponent,   
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent ,
    ShoppingCardComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    LoginComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    MyOrdersComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    CheckOutComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
    
   
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    AngularFireAuthModule,
    CustomFormsModule,
    DataTableModule,
    RouterModule.forRoot([
      {path : '', component: ProductsComponent },
      {path : 'products', component: ProductsComponent },
      {path : 'shopping-cart', component: ShoppingCardComponent },
      {path : 'login', component: LoginComponent },

      {path : 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      {path : 'order-success/:id', component: OrderSuccessComponent , canActivate: [AuthGuard] },      
      {path : 'my/orders', component: MyOrdersComponent , canActivate: [AuthGuard] },
      
      {path : 'admin/products/new', component: ProductFormComponent , canActivate: [AuthGuard, AdminAuthGuard] },
      {path : 'admin/products/:id', component: ProductFormComponent , canActivate: [AuthGuard, AdminAuthGuard] },
      {path : 'admin/products', component: AdminProductsComponent , canActivate: [AuthGuard, AdminAuthGuard] },
      {path : 'admin/orders', component: AdminOrdersComponent , canActivate: [AuthGuard, AdminAuthGuard] }
    ]),
    NgbModule.forRoot()

  ],
  providers: [AuthService, AuthGuard, UserService, AdminAuthGuard, CategoryService, ProductService, ShoppingCartService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
