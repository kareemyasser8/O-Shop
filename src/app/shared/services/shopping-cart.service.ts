import { take, Observable, map } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {

  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-cart/' + cartId + '/items').remove();
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId()
    return this.db.object('/shopping-cart/' + cartId)
      .valueChanges().pipe(
        map((x: ShoppingCart) => {
          return new ShoppingCart(x.items)
        })
      );
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1)
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1)
  }

  private create() {
    return this.db.list('/shopping-cart').push({
      dataCreated: new Date().getTime()
    })
  }

  private getItem(cartId: string, productId: string): AngularFireObject<ShoppingCartItem> {
    return this.db.object('/shopping-cart/' + cartId + '/items/' + productId)
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key

    //  this.create().then()
  }

  private async updateItem(product: Product, change: number) {

    let item$: AngularFireObject<ShoppingCartItem>;
    let cartId = await this.getOrCreateCartId()

    item$ = this.getItem(cartId, product.$key)

    item$.valueChanges().pipe((take(1))).subscribe((item)=>{
      let quantity
      if(item)
        quantity = item.quantity + change
      else quantity = 0 + change

      if(quantity === 0) item$.remove();
      else
      item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      })

    })
  }
}


// item$.snapshotChanges().pipe((take(1))).subscribe((item) => {
//   let quantity;
//   if (item.payload.exists())
//     quantity = item.payload.val().quantity + change
//   else
//     quantity = 0 + change

//   if (quantity === 0) { item$.remove(); console.log(quantity); }
//   else {
//     if (item.payload.exists())
//       item$.update({ quantity: quantity })
//     else
//     item$.update({
//       title: product.title,
//       imageUrl: product.imageUrl,
//       price: product.price,
//       quantity: quantity
//     })
//   }


// })





// item$.snapshotChanges().pipe(take(1)).subscribe((item) => {
//   if (item.payload.exists()) {
//     item$.update({ quantity: item.payload.val().quantity + change })
//   } else {
//     item$.update({
//       title: product.payload.val().title,
//       imageUrl: product.payload.val().imageUrl,
//       price: product.payload.val().price,
//       quantity: 0 + change
//     })
//   }
// }
// )
