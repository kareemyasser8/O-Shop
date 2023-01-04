export class ShoppingCartItem{

  title: string;
  imageUrl:string;
  $key:string;
  price: number;
  quantity: number;

  constructor(init? : Partial<ShoppingCartItem>){
    Object.assign(this,init)
  }

  get totalPrice(){
    return this.price * this.quantity;
  }

}
