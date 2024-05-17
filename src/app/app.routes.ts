import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
          },
          {
            path: 'products',
            loadComponent: () => import('./pages/products/products.component').then(c => c.ProductsComponent),
          },
          {
            path: 'categories',
            loadComponent: () => import('./pages/categories/categories.component').then(c => c.CategoriesComponent),
          }
      ]
    }
];
