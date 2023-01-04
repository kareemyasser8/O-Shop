import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart{

  public itemsArray: ShoppingCartItem[] = []

  constructor(public items: {[key:string]: ShoppingCartItem}){
    this.items = items || {};
      for(let productId in items){
        let item = items[productId];
        this.itemsArray.push(new ShoppingCartItem({...item,$key: productId}))
      }
  }

  get totalPrice(){
    let sum = 0;
    for(let productId in this.itemsArray)
        sum += this.itemsArray[productId].totalPrice
    return sum;
  }

  get totalItemsCount(){
    let count = 0;
        for(let productId in this.items)
        count += this.items[productId].quantity
    return count;
  }

  getQuantity(product: Product){
    let item = this.items[product.$key]
    return item ? item.quantity : 0;
  }

  sayHi(title){
    console.log(title);
    return "Hi kareem";
  }


  // let x  = new ShoppingCartItem();
  // Object.assign(x,item);
  // x.$key = productId;
  // this.itemsArray.push(x);



}

