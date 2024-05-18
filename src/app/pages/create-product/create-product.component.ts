import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  FormArray,
} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CategoriesService } from '@/services/categories/categories.service';
import { ProductsService } from '@/services/products/products.service';
import { Category } from '@/models/category.model';
import { CreateProduct } from '@/models/product.model';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    FontAwesomeModule,
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly productsService = inject(ProductsService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  faTrash = faTrash;
  categories: Category[] = [];
  productForm!: FormGroup;

  constructor() {
    this.productForm = this.formBuilder.group({
      sku: ['', Validators.required],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      brand: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      images: this.formBuilder.array<string>([], this.urlArrayValidator),
    });
  }

  ngOnInit(): void {
    this.categoriesService
      .getCategories({ limit: 100, offset: 0 })
      .pipe(map((result) => result.categories))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  urlArrayValidator(control: AbstractControl): ValidationErrors | null {
    const formArray = control as FormArray;
    for (let i = 0; i < formArray.controls.length; i++) {
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      if (control.value && !urlPattern.test(control.value)) {
        return { invalidUrl: true };
      }
    }
    return null;
  }

  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }
  addImage(): void {
    this.images.push(this.formBuilder.control(''));
  }
  removeImage(index: number): void {
    this.images.removeAt(index);
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;
      const newProduct: CreateProduct = this.productForm.value;
      this.productsService.createProduct(newProduct).subscribe({
        next: (product) => {
          this.snackBar.open(`Product created ${product.id}`, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.snackBar.open(error?.message ?? 'Error creating product', 'Close', {
            duration: 3000,
          });
        }
      });
  }
}
