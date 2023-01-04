import { Product } from 'src/app/shared/models/product';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;

  dtOptions: DataTables.Settings = {};

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private productServie: ProductService) {

    this.subscription = this.productServie.getAll().
      subscribe(
        (p: Product[]) =>{
          this.filteredProducts = this.products = p
          this.dtTrigger.next(this.filteredProducts);
        }
      )

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
      // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

  }

  filter(query: string) {
    this.filteredProducts = (query)?
    this.products.filter((p:any)=> p.payload.val().title.toLowerCase().includes(query.toLowerCase())) : this.products
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
  }

}
