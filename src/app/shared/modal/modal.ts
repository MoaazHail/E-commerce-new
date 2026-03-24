import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ModalType } from '../../lib/types/modal';
import { Product } from '../../lib/types/product';
import { ProductService } from '../../features/services/home';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal implements OnInit {
  @Input() modalType!: ModalType;
  @Input() id!: number;

  // Injectable
  productService = inject(ProductService);

  toaster = inject(ToastrService);

  // Modal State: 'none', 'update', or 'delete'
  modalState = signal<ModalType>('none');
  selectedProduct = signal<Product | null>(null);

  // Form
  updateForm = new FormGroup({
    title: new FormControl(`${this.selectedProduct()?.title}`),
    price: new FormControl(`${this.id}`),
    stock: new FormControl(`${this.selectedProduct()?.stock}`),
  });

  addForm = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    stock: new FormControl(''),
  });

  ngOnInit(): void {
    this.modalState.set(this.modalType);
    this.productService.getProductById(this.id).subscribe({
      next: (payload) => {
        console.log(payload);
        this.selectedProduct.set(payload);
      },
    });
  }

  closeModal() {
    this.modalState.set('none');
  }

  confirmAction() {
    if (this.modalState() === 'delete') {
      console.log('Deleting:', this.selectedProduct()?.id);
      this.toaster.success(`product deleted !`, 'DELETE');
    } else if (this.modalState() === 'update') {
      console.log('Updating:', this.selectedProduct()?.id);
      this.toaster.success(`product updated !`, 'UPDATE');
    } else if (this.modalState() === 'add') {
      this.toaster.success(`new product Added !`, 'ADD');
    }
    this.closeModal();
  }
}
