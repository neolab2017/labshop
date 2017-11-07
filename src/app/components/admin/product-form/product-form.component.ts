import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  
    categories$;
    product = {};
    id;
  
  
    constructor( 
      private route: ActivatedRoute,
      private categotyService: CategoryService, 
      private ProductService: ProductService,
      private router: Router) {

        this.id= this.route.snapshot.paramMap.get('id');
        
                if (this.id){
                  this.ProductService.get(this.id).take(1).subscribe(p => this.product=p)
                }
      }

      
        ngOnInit() {
    
          this.categories$=this.categotyService.getCategories();
       

      
        }

        save (product) {

          if(this.id){
          this.ProductService.update(this.id, product)
          }
          else {

            this.ProductService.create(product);           

          }    

          this.router.navigate(['/admin/products'])

        }
        
        delete () {
          if(!confirm('Delete?')){return}
          else
          {
            this.ProductService.delete(this.id);
            this.router.navigate(['/admin/products'])
            
          }
        }
  }
