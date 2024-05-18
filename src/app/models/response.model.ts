import { Category } from './category.model';
import { Product } from './product.model';

export interface ProductsResult {
  products: Product[];
  total: number;
}

export interface CategoriesResult {
  categories: Category[];
  total: number;
}
