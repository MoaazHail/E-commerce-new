import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ProductService } from '../../../core/services/poduct.service';
import { Product, ProductResponse } from '../../../lib/types/product';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { CategoryService } from '../../../core/services/category.service';
import { Categories } from '../../../lib/types/category';
import { WishlistService } from '../../../core/services/wishlist.service';
import { CartService } from '../../../core/services/cart.service';

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
  private _productService = inject(ProductService);

  // Inject Cart Service
  private _cartService = inject(CartService);

  // Inject Auth Service
  private _authService = inject(AuthService);

  // Inject Category Service
  private _categoryService = inject(CategoryService);

  private _wishlistService = inject(WishlistService);

  // ------- Signals --------
  categories = signal<Categories[] | null>(null);
  products = signal<Product[]>([]);
  todays = signal<Product[]>([]);
  defaultImage = signal('assets/no-item.png');

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
  totalItems = signal(54);

  // Computed total pages based on signals
  totalPages = computed(() => Math.ceil(this.totalItems() / this.limit()));

  visiblePages = computed(() => {
    const current = this.currentPage();
    const max = this.totalPages();

    if (max <= 0) return [];
    if (current <= 1) return [1, 2, 3].filter((p) => p <= max);
    if (current >= max) return [max - 2, max - 1, max].filter((p) => p > 0);
    return [current - 1, current, current + 1];
  });

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
    this._productService
      .getAllProducts(this.currentPage(), this.limit())
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (payload) => {
          this.products.set(payload.data);
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
    this._productService
      .getTodays()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (payload) => {
          this.todays.set(payload.data);

          this.isLoading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.isLoading.set(false);
        },
      });
  }

  // Redirect To Product Details Page
  productDetails(id: string) {
    // Add callback Param To url
    const callback = this._router.url;

    this._router.navigate(['products', id]);
    // console.log(callback);
  }

  // Add Product To Gust Cart
  addToGustCart(id: string, type: string) {
    if (type === 'product') {
      const product = this.products().find((p) => p._id === id);
      if (!product) return;

      const quantity = this.quantity();

      this.productsCart.update((cart) => {
        const safeCart = Array.isArray(cart) ? cart : [];

        const index = safeCart.findIndex((item) => item.product?._id === id);

        if (index !== -1) {
          return [...safeCart];
        }
        this._cartService.productsCart.update((last) => last + 1);
        // Add new product
        return [...safeCart, { product, quantity }];
      });
    } else if (type === 'todays') {
      const product = this.todays().find((p) => p._id === id);
      if (!product) return;

      const quantity = this.quantity();

      this.productsCart.update((cart) => {
        const safeCart = Array.isArray(cart) ? cart : [];

        const index = safeCart.findIndex((item) => item.product?._id === id);

        if (index !== -1) {
          return [...safeCart];
        }
        this._cartService.productsCart.update((last) => last + 1);
        // Add new product
        return [...safeCart, { product, quantity }];
      });
    }

    // Save updated signal to storage
    localStorage.setItem('my-cart', JSON.stringify(this.productsCart()));

    // Add Product

    console.log(this._cartService.productsCart());

    // Toaster
    this._toaster.success(`product added to cart!`, 'Success');
  }

  changePage(page: number) {
    const max = this.totalPages();

    // Guard clause: stay within bounds and avoid redundant navigation
    if (page < 1 || page > max || page === this.currentPage()) return;

    this._router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: page, // Now using page instead of skip
        limit: this.limit(),
        select: 'title,price',
      },
      queryParamsHandling: 'merge',
    });
  }

  getAllCategories() {
    this.isLoading.set(true);
    this._categoryService
      .getAllCategories()
      // .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (payload) => {
          // console.log(payload.data.categories);

          this.categories.set(payload.data.categories);
          // this.isLoading.set(false);
        },
        error: (err) => {
          console.error(err);
          // this.isLoading.set(false);
        },
      });
  }

  // Redirect To Category Page
  categoryBySlogan(slog: string) {
    // Add callback Param To url
    // const callback = this._router.url;
    this._router.navigate(['category', slog]);
  }

  // Add Or Remove Item In Wishlist
  toggleWishlist(productId: string) {
    this._wishlistService.toggleWishlist(productId).subscribe({
      next: (_) => {
        this._toaster.success(`product add in wishlist !`, 'Success');
      },
      error(err) {
        console.log(err.error.message);
      },
    });
  }
}
