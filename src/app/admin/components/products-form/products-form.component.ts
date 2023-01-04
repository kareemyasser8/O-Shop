import { ProductService } from 'src/app/shared/services/product.service';
import { take } from 'rxjs';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
 // take rxjs help me to take one value from observable and then destroy it later


@Component({
  selector: 'products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})



export class ProductsFormComponent implements OnInit {

  // categories$ = new Subject<any>;
  categories$;
  product: any = {}
  // product = {
  //   title: " ",
  //   price: 0,
  //   category: " ",
  //   imageUrl: " "
  //  };
  id;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {


    this.categories$ = categoryService.getAll().valueChanges();
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id != "new") this.productService.get(this.id).pipe(take(1)).subscribe(p=>(this.product = <Product>p))

    // this.categories$ = new BehaviorSubject(null);

    // categoryService.getCategories().valueChanges().subscribe(
    //   categoriesList => this.categories$.next(categoriesList)
    // )
  }

  save(product) {
    if(this.id != "new") this.productService.update(this.id,product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products'])
  }

  delete(){
      var result = confirm("Want to delete?")
      if(!result){
        return
      }
        this.productService.delete(this.id);
        this.router.navigate(['/admin/products'])

  }


  ngOnInit(): void {
  }

}
