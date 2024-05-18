import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Pagination } from '@/models/query.model';
import { CreateProduct, Product } from '@/models/product.model';
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
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  createProduct(product: CreateProduct) {
    return this.http.post<Product>(`${this.baseUrl}/products`, product);
  }
}
