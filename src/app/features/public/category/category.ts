import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../core/services/poduct.service';
import { AuthService } from '../../../core/services/auth.service';
import { Product } from '../../../lib/types/product';
import { CategoryService } from '../../../core/services/category.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  // --- Injectable ---
  // Inject Route
  private _router = inject(Router);

  // Inject Toastr
  private _toaster = inject(ToastrService);

  // Inject Product Service
  private _categoryService = inject(CategoryService);

  // Inject Product
  private _CartService = inject(CartService);

  // Inject Auth Service
  private _authService = inject(AuthService);

  // Inject Activated Route
  private _route = inject(ActivatedRoute);

  // --- Signals ---
  products = signal<Product[]>([]);
  categorySlogan: string | null = null;
  productsCart = signal<{ product: any; quantity: number }[]>([]);
  quantity = signal<number>(1);
  callback = signal<string>('');

  // Pagination Signals
  limit = signal(9);
  currentPage = signal(1);
  totalItems = signal(194);
  totalPages = computed(() => Math.ceil(this.totalItems() / this.limit()));

  visiblePages = computed(() => {
    const current = this.currentPage();
    const max = this.totalPages();

    // If we are at the beginning
    if (current <= 1) return [1, 2, 3].filter((p) => p <= max);

    // If we are at the end
    if (current >= max) return [max - 2, max - 1, max].filter((p) => p > 0);

    // If we are in the middle, show [previous, current, next]
    return [current - 1, current, current + 1];
  });

  // Skip is now a computed value based on page and limit
  skip = computed(() => (this.currentPage() - 1) * this.limit());

  // NG OnInit
  ngOnInit(): void {
    const cart = localStorage.getItem('my-cart');

    if (cart) {
      this.productsCart.set(JSON.parse(cart));
    }
    this.categorySlogan = this._route.snapshot.paramMap.get('slog');

    // this.getProduct();
  }

  // Render The Product Details
  getProduct() {
    this._categoryService
      .getCategoryBySlogan(this.categorySlogan ? this.categorySlogan : '')
      .subscribe({
        next: (payload) => {
          console.log(payload.products);

          this.products.set(payload.products);
        },
        error: (err) => {
          // Future: Be A UI Component For The Error
          console.log(err.error.message);
        },
      });
  }

  // Redirect To Product Details Page
  productDetails(id: string) {
    // Add callback Param To url
    this.callback.set(this._router.url);
    this._router.navigate(['products', id], {
      queryParams: {
        callback: this.callback(),
      },
    });
  }

  // Add This Product To The Cart
  addToCart(id: string) {
    if (this._authService.isAuthenticated()) {
      this.addToUserCart(id);
      // Toaster
      this._toaster.success(`product added to cart!`, 'Success');
    } else {
      if (this.quantity() <= 1) {
        this.addToGuestCart(id);
        // Toaster
        this._toaster.success(`product added to cart!`, 'Success');
      }
    }
  }

  // Add The Product To The Cart <Guest>
  addToGuestCart(id: string) {
    const product = this.products().find((p) => p._id === id);
    if (!product) return;

    const quantity = this.quantity();

    this.productsCart.update((cart) => {
      const safeCart = Array.isArray(cart) ? cart : [];

      const index = safeCart.findIndex((item) => item.product?._id === id);

      if (index !== -1) {
        return [...safeCart];
      }

      // Add new product
      return [...safeCart, { product, quantity }];
    });
  }

  // Add The Product To The Cart <User Has Token>
  addToUserCart(id: string) {
    this._CartService.addToCart(id).subscribe({
      next: (_) => {
        //Add Toaster To UX
        this._toaster.success(`product added to cart!`, 'Success');
      },
      error: (err) => {
        // Future: Be A UI Component For The Error
        console.log(err.error.message);
        this._toaster.error(`An error occurred!`, 'Error');
      },
    });
  }
}
