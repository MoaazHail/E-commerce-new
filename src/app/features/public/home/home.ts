import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    // Listen to Query Params changes
    this.route.queryParams.subscribe((params) => {
      const page = +params['page'] || 1;
      const limit = +params['limit'] || 9;

      this.currentPage.set(page);
      this.limit.set(limit);

      // Fetch data whenever params change
      this.getData();
    });
  }

  getData() {
    this.isLoading.set(true);
    // Use the values from your signals
    this.homeService.getAllProducts(this.skip(), this.limit()).subscribe({
      next: (payload) => {
        this.products.set(payload.products);
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

  changePage(page: number) {
    const max = Math.ceil(this.totalItems() / this.limit());
    if (page < 1 || page > max || page === this.currentPage()) return;

    // Navigate to the same route but with new params
    // This will trigger the subscribe block in ngOnInit
    this.router.navigate([], {
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
}
