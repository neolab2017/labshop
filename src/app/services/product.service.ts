import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class ProductService implements OnInit {

  constructor( private db: AngularFireDatabase ) {
    
   }

   create(product){
   return  this.db.list('/products').push(product);

   }

   ngOnInit () {
     
   }

   getAll () {
    return this.db.list('/products');
   }


   get(productid){
     return this.db.object('/products/' + productid )
   }

   update (id, product){
     return this.db.object('/products/' +id).update(product);
   }

   delete (id) {

    return this.db.object('/products/' +id).remove();

   }

}