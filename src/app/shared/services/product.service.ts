import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
  }

  getAll():Observable<Product[]>{
    // return this.db.object('/products');
    return this.db.list<Product>('/products')
        .snapshotChanges()
        .pipe(
            map(changes =>
                changes.map(c => {
                    const data = c.payload.val() as Product;
                    const $key = c.payload.key;
                    return { $key, ...data };
                })
            )
        );
  }

  get(productId){
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId,product){
    return this.db.object('/products/'+ productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/'+ productId).remove();
  }

}
