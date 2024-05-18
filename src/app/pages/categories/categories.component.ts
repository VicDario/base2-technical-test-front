import { TableComponent } from '@/components/table/table.component';
import { Category } from '@/models/category.model';
import { Pagination } from '@/models/query.model';
import { CategoriesService } from '@/services/categories/categories.service';
import { Component, inject } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TableComponent, MatPaginatorModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  private readonly categoriesService = inject(CategoriesService);

  columns: string[] = ['id', 'name'];
  categories: Category[] = [];
  pagination: Pagination = {
    offset: 0,
    limit: 10,
  };
  totalItems = 0;

  ngOnInit() {
    this.getCategories();
  }

  private getCategories() {
    this.categoriesService
    .getCategories(this.pagination)
    .subscribe({
      next: (result) => {
        this.categories = result.categories;
        this.totalItems = result.total;
      },
    });
  }

  handlePageEvent(event: PageEvent) {
    this.pagination.offset = event.pageIndex * event.pageSize;
    this.pagination.limit = event.pageSize;
    this.getCategories();
  }
}
