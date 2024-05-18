import { Product } from './product.model';

export interface ProductsResult {
  products: Product[];
  total: number;
}
