import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../../lib/types/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist implements OnInit {
  // --------- Injectable ----------
  // Inject Route
  private _router = inject(Router);

  private _toaster = inject(ToastrService);

  private _route = inject(ActivatedRoute);

  private _wishlistService = inject(WishlistService);
  products = signal<Product[]>([]);

  // Guest Cart
  productsCart = signal<{ product: Product; quantity: number }[]>([]);
  quantity = signal<number>(1);

  // Pagination

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

  // Ng OnInit
  ngOnInit(): void {
    // Display The Wishlist
    this.getWishlist();
  }

  // Display All Wishlist Items
  getWishlist() {
    this._wishlistService.getWishlist().subscribe({
      next: (payload) => {
        console.log(payload.data.products);

        this.products.set(payload.data.products);
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  // Remove Item In Wishlist
  toggleWishlist(productId: string) {
    this._wishlistService.toggleWishlist(productId).subscribe({
      next: (_) => {
        this.products.update((allProducts) => allProducts.filter((p) => p._id !== productId));
        this._toaster.success(`product removes in wishlist !`, 'Success');
      },
      error(err) {
        console.log(err.error.message);
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

  addToCart(id: string, type: string) {
    console.log(id);

    this.addToGustCart(id, type);
    console.log('Not Authenticated');
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
    const max = this.totalPages();

    // Guard clause: stay within bounds and avoid redundant navigation
    if (page < 1 || page > max || page === this.currentPage()) return;

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        page: page, // Now using page instead of skip
        limit: this.limit(),
        select: 'title,price',
      },
      queryParamsHandling: 'merge',
    });
  }
}
