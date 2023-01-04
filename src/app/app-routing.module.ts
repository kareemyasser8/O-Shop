import { ProductsComponent } from './shopping/components/products/products.component';
import { ProductsFormComponent } from './admin/components/products-form/products-form.component';
import { AdminAuthGaurd } from './admin/services/admin-auth-gaurd.service';
import { AuthGaurd } from './shared/services/auth-gaurd.service';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { LoginComponent } from './core/components/login/login.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { CheckOutComponent } from './shopping/components/check-out/check-out.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
// import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: ProductsComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'login', component: LoginComponent},

  {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGaurd]},
  {path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGaurd]},
  {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGaurd]},


  {
    path: 'admin/products/:id',
    component: ProductsFormComponent,
    canActivate: [AuthGaurd, AdminAuthGaurd]
  },

  {
    path: 'admin/products/new',
    component: ProductsFormComponent,
    canActivate: [AuthGaurd, AdminAuthGaurd]
  },

  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGaurd, AdminAuthGaurd]
  },

  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGaurd, AdminAuthGaurd]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
