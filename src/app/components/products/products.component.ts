import { ShoppingCart } from '../../models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];
  productsF: any[] = []; 
  category: string;
  cart: any;
  cart$: Observable<ShoppingCart>;
  
    constructor( 
      private getService: ProductService,      
      private route: ActivatedRoute,
      private shoppingCardS: ShoppingCartService
    ) {     
 
       }
  
  async  ngOnInit() {

    this.cart$= await this.shoppingCardS.getCart()

    this.populateProducts();  
    
    } 
    
    private populateProducts () {

      this.getService.getAll().switchMap(product=>{
        
        this.products= this.productsF=product
  
        return  this.route.queryParamMap;})
        .subscribe(params=> {    
          console.log("changed")      
            this.category = params.get('category');    
            
           this.applyFilter()
          
          }) 
    }

    private applyFilter () {
      this.products = (this.category) ?
      this.productsF.filter(prod=>prod.category==this.category):
      this.products  =  this.productsF;    
    }

}
