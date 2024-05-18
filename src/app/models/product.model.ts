import { Category } from './category.model';

export interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  stock: number;
  description: string;
  category: Category | string;
  images?: string[];
}

export interface CreateProduct extends Omit<Product, 'id' | 'category'> {
  category: string;
}
