import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Pagination } from '../../models/query.model';
import { CategoriesResult } from '@/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getCategories(paginate: Pagination) {
    return this.http.get<CategoriesResult>(`${this.baseUrl}/categories`, {
      params: {
        limit: paginate.limit,
        offset: paginate.offset,
      }
    });
  }

}
