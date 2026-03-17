import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { ProductService } from '../../services/home';
import { Product, ProductResponse } from '../../../lib/types/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  // --------- Injectable ----------
  // Inject Route
  router = inject(Router);

  // Inject Toaster
  toaster = inject(ToastrService);

  // Inject Product Service
  authService = inject(AuthService);

  // Inject Auth Service
  homeService = inject(ProductService);

  // ------- Signals --------
  response = signal<ProductResponse | null>(null);
  products = signal<Product[]>([]);

  // Guest Cart
  productsCart = signal<{ product: Product; quantity: number }[]>([]);
  quantity = signal<number>(1);

  // Pagination
  skip = signal<number>(0);
  limit = signal(9);
  currentPage = signal(1);
  totalItems = signal(194);
  totalPages = computed(() => Math.ceil(this.totalItems() / this.limit()));
  visiblePages = computed(() => {
    const current = this.currentPage();
    const max = this.totalPages();

    if (current <= 1) return [1, 2, 3].filter((p) => p <= max);
    if (current >= max) return [max - 2, max - 1, max].filter((p) => p > 0);

    return [current - 1, current, current + 1];
  });

  // NG OnInit
  ngOnInit(): void {
    this.getData();
    // Create A Cart In Local Storage
    const cart = localStorage.getItem('my-cart');
    if (cart) {
      this.productsCart.set(JSON.parse(cart));
    }
  }

  // Display All Products
  getData() {
    this.homeService.getAllProducts(this.skip(), this.limit()).subscribe({
      next: (payload) => {
        this.products.set(payload.products);
      },
      error: (err) => {
        // Future: Be A UI Component For The Error
        console.log(err.error.message);
      },
    });
  }

  // Redirect To Product Details Page
  productDetails(id: number) {
    this.router.navigate(['products', id]);
    // Future: Add callback Param To url
  }

  // Add Product To User Cart
  addToUserCart(id: number) {
    this.homeService.addToCart(id).subscribe({
      next: (_) => {
        //Add Toaster To UX
        this.toaster.success(`product added to cart!`, 'Success');
      },
      error: (err) => {
        // Future: Be A UI Component For The Error
        console.log(err.error.message);
      },
    });
  }

  // Add Product To Gust Cart
  addToGustCart(id: number) {
    const product = this.products().find((p) => p.id === id);
    if (!product) return;

    const quantity = this.quantity();

    this.productsCart.update((cart) => {
      const safeCart = Array.isArray(cart) ? cart : [];

      const index = safeCart.findIndex((item) => item.product?.id === id);

      if (index !== -1) {
        return [...safeCart];
      }

      // Add new product
      return [...safeCart, { product, quantity }];
    });

    // Save updated signal to storage
    localStorage.setItem('my-cart', JSON.stringify(this.productsCart()));

    // Toaster
    this.toaster.success(`product added to cart!`, 'Success');
  }

  // Pagination
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      if (page === 1) {
        this.skip.set(0);
      }
      this.skip.set((page - 1) * this.limit());
      this.getData();
    }
  }
}
