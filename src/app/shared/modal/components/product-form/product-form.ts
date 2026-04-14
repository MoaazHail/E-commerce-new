import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalType } from '../../../../lib/types/modal';
import { ProductService } from '../../../../core/services/poduct.service';
import { CategoryService } from '../../../../core/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../../lib/types/product';
import { Categories } from '../../../../lib/types/category';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnInit {
  @Input() id!: string;
  @Input() modalType!: ModalType;

  // ------ Injectable -------
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  toaster = inject(ToastrService);

  modalState = signal<ModalType | null>(null);
  selectedProduct = signal<Product | null>(null);
  errorApi = signal<string | null>(null);
  categories = signal<Categories[] | null>(null);

  // Form
  confirmForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    price: new FormControl(NaN, Validators.required),
    stock: new FormControl(NaN, Validators.required),
  });

  ngOnInit(): void {
    this.modalState.set(this.modalType);
    if (this.modalState() === 'update' || 'delete') {
      this.productService.getProductById(this.id).subscribe({
        next: (payload) => {
          this.selectedProduct.set(payload.data);
          this.inUpdate();
        },
      });
    }
    this.categoryService.getAllCategories().subscribe({
      next: (payload) => {
        // console.log(payload.data.categories);
        this.categories.set(payload.data.categories);
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  closeModal() {
    this.modalState.set('none');
    this.confirmForm.reset();
  }

  inUpdate() {
    this.confirmForm.patchValue({
      name: this.selectedProduct()?.name,
      description: this.selectedProduct()?.description,
      category: this.selectedProduct()?.category,
      price: this.selectedProduct()?.price,
      stock: this.selectedProduct()?.stock,
    });
  }

  confirmAction() {
    // Delete
    if (this.modalState() === 'delete') {
      this.productService.deleteProduct(this.id).subscribe({
        next: (payload) => {
          console.log(payload);
          this.toaster.success(`product deleted !`, 'DELETE');
          this.closeModal();
        },
        error: (err) => {
          this.errorApi.set(err.error.message);
        },
      });
    }

    // Update
    else if (this.modalState() === 'update') {
      console.log('Updating:', this.selectedProduct()?._id);
      this.productService.updateProduct(this.confirmForm, this.id).subscribe({
        next: (payload) => {
          console.log(payload);
          this.toaster.success(`product updated!`, 'UPDATE');
          this.closeModal();
        },
        error: (err) => {
          this.errorApi.set(err.error.message);
          this.toaster.error(`Can't update this product!`, 'VALIDATION ERROR');
        },
      });
    }

    // Add
    else if (this.modalState() === 'add') {
      console.log(this.confirmForm.value);

      this.productService.addProduct(this.confirmForm.value).subscribe({
        next: (payload) => {
          this.toaster.success(`new product Added!`, 'ADD');
          console.log(payload);
          this.closeModal();
        },
        error: (err) => {
          this.errorApi.set(err.error.message);
          this.toaster.error(`Can't add new product!`, 'VALIDATION ERROR');
          console.log(err.error.message);
        },
      });
      // console.log(this.confirmForm.value);
      if (this.confirmForm.value) {
      }
    }
    // this.closeModal();
  }
}
