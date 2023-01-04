import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { CustomFormsModule } from 'ng2-validation';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { ProductCardComponent } from '../components/product-card/product-card.component';
import { ProductFilterComponent } from '../components/product-filter/product-filter.component';
import { ProductQuantityComponent } from '../components/product-quantity/product-quantity.component';
import { AuthService } from '../services/auth.service';
import { CategoryService } from '../services/category.service';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { UserService } from '../services/user.service';
import { AuthGaurd } from './../services/auth-gaurd.service';


//to organise the imports alphabtically press CTRL + ALT

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    ProductFilterComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    AppRoutingModule,
    CustomFormsModule,
  ],
  exports:[
    ProductCardComponent,
    ProductQuantityComponent,
    ProductFilterComponent,
    CommonModule,
    FormsModule,
    DataTablesModule,
    AppRoutingModule,
    CustomFormsModule,

  ],
  providers:[
    AuthService,
    AuthGaurd,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
  ]
})
export class SharedModule { }
