import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$;
  @Input('category') category;

  constructor(categoryService: CategoryService) {

    this.categories$ = categoryService.getAll().snapshotChanges().pipe(
      map(categories => categories.map(
        a => {
          const key = a.payload.key;
          const data = a.payload.val();
          return { data, key };
        }
      ))
    );

  }

  ngOnInit(): void {
  }

}
