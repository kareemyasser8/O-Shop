import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BsNavbarComponent } from '../components/bs-navbar/bs-navbar.component';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { SharedModule } from './../../shared/shared/shared.module';

@NgModule({
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    NgbModule
  ],
  exports:[
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
  ]
})
export class CoreModule { }
