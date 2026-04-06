import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
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
  public homeService = inject(ProductService);
  // Inject Toaster
  toaster = inject(ToastrService);

  // --- Signals ---
  public products = signal<Product[]>([]);
  public productStats = signal([
    { title: 'Total Products', count: 194 },
    { title: 'Active', count: 180 },
    { title: 'Low Stock', count: 10 },
    { title: 'Out of Stock', count: 4 },
  ]);

  // Track the ID of the active menu
  activeMenuId = signal<number | null>(null);

  openUpdate = signal(false);
  openDelete = signal(false);
  openAdd = signal(false);
  productId = signal(NaN);

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
    this.homeService.getProducts().subscribe({
      next: (payload) => {
        this.products.set(payload.products);
      },
      error: (err) => {
        // Future: Be A UI Component For The Error
        console.log(err.error.message);
      },
    });
  }

  toggleMenu(id: number, event: Event) {
    event.stopPropagation(); // Prevents the row click from firing
    this.activeMenuId.set(this.activeMenuId() === id ? null : id);
  }

  onDelete(id: number) {
    this.productId.set(id);
    this.openDelete.set(true);
    this.openUpdate.set(false);
    this.openAdd.set(false);
  }

  onUpdate(id: number) {
    this.productId.set(id);
    this.openUpdate.set(true);
    this.openDelete.set(false);
    this.openAdd.set(false);
  }
  onAdd() {
    this.openAdd.set(true);
    this.openDelete.set(false);
    this.openUpdate.set(false);
  }
}
