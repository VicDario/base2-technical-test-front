import { Component, OnInit, inject } from '@angular/core';
import { TableComponent } from '@/components/table/table.component';
import { ProductsService } from '@/services/products/products.service';
import { Product } from '@/models/product.model';
import { Pagination } from '@/models/query.model';
import { map } from 'rxjs';
import { Category } from '@/models/category.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TableComponent, MatPaginatorModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  columns: string[] = ['sku', 'name', 'brand', 'price', 'stock', 'category'];
  products: (Product & { category: string })[] = [];
  pagination: Pagination = {
    offset: 0,
    limit: 10,
  };
  totalItems = 0;

  ngOnInit() {
    this.getProducts();
  }

  private getProducts() {
    this.productsService
    .getProducts(this.pagination)
    .pipe(
      map(
        (result) => ({
          products: result.products.map((product) => ({...product, category: (product.category as Category).name})),
          total: result.total,
        })
      )
    )
    .subscribe({
      next: (result) => {
        this.products = result.products;
        this.totalItems = result.total;
      },
    });
  }

  handlePageEvent(event: PageEvent) {
    this.pagination.offset = event.pageIndex * event.pageSize;
    this.pagination.limit = event.pageSize;
    this.getProducts();
  }
}
