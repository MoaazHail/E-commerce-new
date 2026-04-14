import { Component, effect, inject, Input, OnInit, output, signal } from '@angular/core';
import { ModalType, Page } from '../../lib/types/modal';
import { Product } from '../../lib/types/product';
import { ProductService } from '../../core/services/poduct.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Categories } from '../../lib/types/category';
import { CategoryService } from '../../core/services/category.service';
import { DashboardOrder } from '../../lib/types/dashboard/order';
import { OrderService } from '../../core/services/order.service';
import { ShippingAddress } from '../../lib/types/order';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal implements OnInit {
  @Input() modalType!: ModalType;
  @Input() id!: string;
  @Input() page!: Page;
  @Input() errorMessage!: string | null;
  @Input() shippingAddress!: ShippingAddress | undefined;
  @Input() isShippingAddress!: any;

  // Injectable
  private _productService = inject(ProductService);
  private _orderService = inject(OrderService);

  categoryService = inject(CategoryService);
  toaster = inject(ToastrService);

  // ------------- Data ----------------
  onConfirm = output<any>();
  onDelete = output<string>();
  onClose = output<void>();

  modalState = signal<ModalType>('none');
  selectedProduct = signal<Product | null>(null);
  errorApi = signal<string | null>(null);
  categories = signal<Categories[] | null>(null);
  orders = signal<DashboardOrder[] | null>(null);

  // Form
  confirmForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    price: new FormControl(NaN, Validators.required),
    stock: new FormControl(NaN, Validators.required),
  });

  orderForm = new FormGroup({
    isDelivered: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.modalState.set(this.modalType);
    if (this.page === 'dashboard/product') {
      this.categoryService.getAllCategories().subscribe({
        next: (payload) => {
          this.categories.set(payload.data.categories);
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
      if (this.modalState() === 'update' || 'delete') {
        this._productService.getProductById(this.id).subscribe({
          next: (payload) => {
            this.selectedProduct.set(payload.data);
            this.inUpdate();
          },
        });
      }
    }
    if (this.page === 'dashboard/order') {
      if (this.modalState() === 'update') {
      }
    }
    console.log(this.modalState());
  }

  closeModal() {
    this.modalState.set('none');
    this.confirmForm.reset();
    this.isShippingAddress = false;
    this.onClose.emit();
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

  productAction() {
    // Delete
    if (this.modalState() === 'delete') {
      this._productService.deleteProduct(this.id).subscribe({
        next: (payload) => {
          console.log(payload);
          this.toaster.success(`product deleted !`, 'DELETE');
          this.onDelete.emit(this.id);
          this.closeModal();
        },
        error: (err) => {
          this.errorApi.set(err.error.message);
        },
      });
    }

    // Update
    else if (this.modalState() === 'update') {
      console.log(this.confirmForm.value);

      this._productService.updateProduct(this.confirmForm.value, this.id).subscribe({
        next: (payload) => {
          console.log(payload);
          this.toaster.success(`product updated!`, 'UPDATE');
          this.onConfirm.emit({ form: this.confirmForm.value, productId: this.id });
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
      this._productService.addProduct(this.confirmForm.value).subscribe({
        next: (payload) => {
          this.toaster.success(`new product Added!`, 'ADD');
          console.log(payload);
          this.onConfirm.emit(this.confirmForm.value);
          this.closeModal();
        },
        error: (err) => {
          this.errorApi.set(err.error.message);
          this.toaster.error(`Can't add new product!`, 'VALIDATION ERROR');
          console.log(err.error.message);
        },
      });
    }
  }

  orderAction() {
    // Update
    if (this.modalState() === 'update') {
      let updateValue;
      if (this.orderForm.value.isDelivered === 'true') {
        updateValue = {
          isDelivered: true,
          isPaid: true,
        };
      } else {
        updateValue = {
          isDelivered: false,
          isPaid: false,
        };
      }

      this._orderService.updateOrder(this.id, updateValue).subscribe({
        next: (payload) => {
          console.log(payload);
          this.toaster.success(`order updated !`, 'SUCCESS');
          this.onConfirm.emit(payload); // <--------------------
          this.closeModal();
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
    }

    // Delete
    else {
      this._orderService.deleteOrder(this.id).subscribe({
        next: (payload) => {
          console.log(payload);
          this.toaster.success(`order deleted !`, 'DELETE');
          this.onDelete.emit(this.id);
          this.closeModal();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
