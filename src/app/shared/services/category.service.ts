import { orderByChild } from '@angular/fire/database';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) {

   }

   getAll(): AngularFireList<unknown>{
    return this.db.list('/categories',ref =>{
        return ref.orderByChild('name');
      }
     )
   }
}
