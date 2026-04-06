import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ProductService } from '../../../core/services/poduct.service';
import { Product, ProductResponse } from '../../../lib/types/product';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { CategoryService } from '../../../core/services/category.service';
import { Categories } from '../../../lib/types/category';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  // --------- Injectable ----------
  // Inject Route
  private _router = inject(Router);

  // Inject Toaster
  private _toaster = inject(ToastrService);

  // Inject Product Service
  private _homeService = inject(ProductService);

  // Inject Auth Service
  private _authService = inject(AuthService);

  // Inject Category Service
  private _categoryService = inject(CategoryService);

  // ------- Signals --------
  categories = signal<Categories[] | null>(null);
  products = signal<Product[]>([]);
  todays = signal<Product[]>([]);

  // Flags
  isLoading = signal<boolean>(false);

  // Guest Cart
  productsCart = signal<{ product: Product; quantity: number }[]>([]);
  quantity = signal<number>(1);

  // Pagination
  private route = inject(ActivatedRoute);

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

  ngOnInit(): void {
    // Initialize Signal from LocalStorage immediately
    const savedCart = localStorage.getItem('my-cart');
    if (savedCart) {
      this.productsCart.set(JSON.parse(savedCart));
    }
    // Listen to Query Params changes
    this.route.queryParams.subscribe((params) => {
      const page = +params['page'] || 1;
      const limit = +params['limit'] || 9;

      this.currentPage.set(page);
      this.limit.set(limit);

      // Fetch data whenever params change
      this.getData();
      this.getTodos();
      this.getAllCategories();
    });
  }

  getData() {
    this.isLoading.set(true);
    // Use the values from your signals
    this._homeService
      .getAllProducts(this.skip(), this.limit())
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (payload) => {
          this.products.set(payload.products);
          this.isLoading.set(false);
          console.log(payload.products);
        },
        error: (err) => {
          console.error(err);
          this.isLoading.set(false);
        },
      });
  }

  // Call Todays API (I don't have it)
  getTodos() {
    this.isLoading.set(true);
    // Use the values from your signals
    this._homeService
      .getTodays()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (payload) => {
          this.todays.set(payload.products);
          console.log(this.todays());

          this.isLoading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.isLoading.set(false);
        },
      });
  }

  // Redirect To Product Details Page
  productDetails(id: number) {
    // Add callback Param To url
    const callback = this._router.url;

    this._router.navigate(['products', id], {
      queryParams: {
        callback: `/limit=${this.limit()}&page=${this.currentPage()}&skip=${this.skip()}&select=title,price`,
      },
    });
    // console.log(callback);
  }

  addToCart(id: number, type: string) {
    console.log(id);

    if (this._authService.isAuthenticated()) {
      this.addToUserCart(id);
      console.log('isAuthenticated');
    } else {
      this.addToGustCart(id, type);
      console.log('Not Authenticated');
    }
  }

  // Add Product To User Cart
  addToUserCart(id: number) {
    this._homeService.addToCart(id).subscribe({
      next: (_) => {
        //Add Toaster To UX
        this._toaster.success(`product added to cart!`, 'Success');
      },
      error: (err) => {
        // Future: Be A UI Component For The Error
        console.log(err.error.message);
      },
    });
  }

  // Add Product To Gust Cart
  addToGustCart(id: number, type: string) {
    if (type === 'product') {
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
    } else if (type === 'todays') {
      const product = this.todays().find((p) => p.id === id);
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
    }

    // Save updated signal to storage
    localStorage.setItem('my-cart', JSON.stringify(this.productsCart()));

    // Toaster
    this._toaster.success(`product added to cart!`, 'Success');
  }

  changePage(page: number) {
    const max = Math.ceil(this.totalItems() / this.limit());
    if (page < 1 || page > max || page === this.currentPage()) return;

    // Navigate to the same route but with new params
    // This will trigger the subscribe block in ngOnInit
    this._router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        limit: this.limit(),
        page: page,
        skip: (page - 1) * this.limit(),
        select: 'title,price',
      },
      queryParamsHandling: 'merge', // keeps other params if you have them
    });
  }

  getAllCategories() {
    this.isLoading.set(true);
    this._categoryService
      .getAllCategories()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (payload) => {
          console.log('categories');

          console.log(payload);

          this.categories.set(payload);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.isLoading.set(false);
        },
      });
  }

  // Redirect To Category Page
  categoryBySlogan(slog: string) {
    // Add callback Param To url
    const callback = this._router.url;
    this._router.navigate(['category', slog], {
      queryParams: {
        callback,
      },
    });
  }
}
