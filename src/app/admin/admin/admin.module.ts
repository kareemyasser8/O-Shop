import { NgModule } from '@angular/core';

import { AdminOrdersComponent } from '../components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from '../components/admin-products/admin-products.component';
import { ProductsFormComponent } from '../components/products-form/products-form.component';
import { AdminAuthGaurd } from '../services/admin-auth-gaurd.service';
import { SharedModule } from './../../shared/shared/shared.module';



@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductsFormComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports:[
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductsFormComponent,
  ],
  providers:[
    AdminAuthGaurd
  ]
})
export class AdminModule { }
