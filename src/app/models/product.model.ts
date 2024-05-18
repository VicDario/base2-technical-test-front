import { Category } from './category.model';

export interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  stock: number;
  description: string;
  category: Category;
  images?: string[];
}