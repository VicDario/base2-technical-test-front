import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Pagination } from '@/models/query.model';
import { Product } from '@/models/product.model';
import { ProductsResult } from '@/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getProducts(pagination: Pagination) {
    return this.http.get<ProductsResult>(`${this.baseUrl}/products`, {
      params: {
        limit: pagination.limit,
        offset: pagination.offset,
      },
    });
  }

  getProduct(id: string) {
    // Implement the logic to get a product by ID
  }

  createProduct(product: Product) {
    // Implement the logic to create a product
  }
}
