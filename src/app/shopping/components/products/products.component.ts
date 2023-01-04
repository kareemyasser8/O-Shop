import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, switchMap, Subscription, Observable } from 'rxjs';
import { Product } from '../../../shared/models/product';
import { ShoppingCart } from '../../../shared/models/shopping-cart';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  dtTrigger: Subject<any> = new Subject<any>();
  productsNormal;
  cart$: Observable<ShoppingCart>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {

  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart()
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll().pipe(
      switchMap((p: Product[]) => {
        this.products = p;
        return this.route.queryParamMap;
      }
      )).subscribe(
        params => {
          this.category = params.get('category');
          this.applyFilter();

        }
      )
  }


  private applyFilter() {
    if (this.category) {
      this.filteredProducts = this.products.filter(
        p => p.category.toLowerCase() == this.category
      )
    } else {
      this.filteredProducts = this.products
    }
  }


}
