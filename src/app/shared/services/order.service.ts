import { map, Observable } from 'rxjs';
import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService:ShoppingCartService) { }

  getOrders(): Observable<Order[]> {
    return this.db.list('/orders').snapshotChanges().pipe(
      map(
        changes=>
        changes.map(c=>{
          const data = c.payload.val() as Order
          const $key = c.payload.key;
          return{$key,...data}
        })
      )
    );
  }

  // query: {
  //   orderByChild: 'userId',
  //   equalTo: userId
  // }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref=>
       ref.orderByChild('userId').equalTo(userId)
    ).snapshotChanges().pipe(
      map(
        changes=>
        changes.map(c=>{
          const data = c.payload.val() as Order
          const $key = c.payload.key;
          return{$key,...data}
        })
      )
    );
  }


  async placeOrder(order: any){
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart()
    return result
  }

}
