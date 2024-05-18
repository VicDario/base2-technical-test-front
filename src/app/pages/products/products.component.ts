import { Component, inject } from '@angular/core';
import { TableComponent } from '@/components/table/table.component';
import { ProductsService } from '@/services/products.service';
import { Products } from '@/models/products.model';
import { Pagination } from '@/models/query.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);

  columns: string[] = ['name','brand', 'price', 'stock', 'category'];
  products: Products[] = [];
  pagination: Pagination = {
    offset: 0,
    limit: 10,
  }

}
