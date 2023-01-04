import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AppUser } from '../../../shared/models/app-user';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { AuthService } from '../../../shared/services/auth.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser: AppUser
  cart$: Observable<ShoppingCart>

  //mesh me7tageen ne3mel unsubscription 3lshan e7na single instance lel component da fel DOM
  //fal subscription da 7atefdal mawgood fel life time beta3 el application
  //w de 7aga e7na me7tagenha 3shan ne3mel subscribe 3la el authentication status beta3et el user law et8ayaret
  //3shan ne3mel rerender lel navigation bar

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser)
    this.cart$ = (await this.shoppingCartService.getCart())
  }

  logout() {
    this.auth.logout();
  }

}
