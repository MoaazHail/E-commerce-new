import { Component, effect, HostListener, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../core/services/poduct.service';
import { Product } from '../../../lib/types/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  // --- Injectable ---
  public productService = inject(ProductService);
  // Inject Toaster
  toaster = inject(ToastrService);

  // --- Signals ---
  public products = signal<Product[]>([]);
  public pagination = signal<{
    currentPage: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  } | null>(null);

  // Track the ID of the active menu
  activeMenuId = signal<string | null>(null);

  onUpdate = signal(false);
  onDelete = signal(false);
  onAdd = signal(false);
  productId = signal<string>('');

  private refreshTrigger = signal<number>(0);

  constructor() {
    effect(() => {
      const trigger = this.refreshTrigger();
      console.log('Refresh triggered! Execution count:', trigger);
      this.getData();
    });
  }
  triggerRefresh() {
    this.refreshTrigger.update((v) => v + 1);
    this.onUpdate.set(false);
    this.onDelete.set(false);
  }
  // --- Ng OnInit ---
  ngOnInit(): void {
    this.getData();
  }

  // Close menu when clicking anywhere else
  @HostListener('document:click')
  closeMenu() {
    this.activeMenuId.set(null);
  }

  // --- Methods ---

  // Get All Products
  getData() {
    this.productService.getProducts().subscribe({
      next: (payload) => {
        this.products.set(payload.data);
        this.pagination.set(payload.pagination);
      },
      error: (err) => {
        // Future: Be A UI Component For The Error
        console.log(err.error.message);
      },
    });
  }

  toggleMenu(id: string, event: Event) {
    event.stopPropagation(); // Prevents the row click from firing
    this.activeMenuId.set(this.activeMenuId() === id ? null : id);
    this.productId.set(id);
    this.onUpdate.set(false);
    this.onDelete.set(false);
    this.onAdd.set(false);
  }

  confirmAction(form: any) {
    if (form?.productId) {
      this.productService.addProduct(form).subscribe({
        next: (payload) => {
          console.log(payload);
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
    } else {
      this.productService.addProduct(form).subscribe({
        next: (payload) => {
          console.log(payload);
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
    }
  }

  deleteAction(isDeleted: boolean) {
    if (isDeleted) {
    }
  }
}
