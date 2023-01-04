import { NgModule } from '@angular/core';

import { CheckOutComponent } from '../components/check-out/check-out.component';
import { MyOrdersComponent } from '../components/my-orders/my-orders.component';
import { OrderSuccessComponent } from '../components/order-success/order-success.component';
import { ProductsComponent } from '../components/products/products.component';
import { ShippingFormComponent } from '../components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from '../components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from '../components/shopping-cart/shopping-cart.component';
import { SharedModule } from './../../shared/shared/shared.module';



@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
  ],
  imports: [
    SharedModule,
  ]
})
export class ShoppingModule { }
