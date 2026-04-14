import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/poduct.service';
import { AuthService } from '../../../core/services/auth.service';
import { Product } from '../../../lib/types/product';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  // --- Injectable ---

  // Inject ActivatedRoute
  private _router = inject(Router);
  // Inject ActivatedRoute
  private _route = inject(ActivatedRoute);

  // Inject Toastr
  private _toaster = inject(ToastrService);

  // Inject Product Service
  private _productService = inject(ProductService);

  private _cartService = inject(CartService);
  // Inject Auth Service
  private _authService = inject(AuthService);

  // --- Signals ---
  product = signal<Product | null>(null);
  productId = signal<string>('');
  productsCart = signal<{ product: any; quantity: number }[]>([]);
  quantity = signal<number>(1);
  callback = signal<any>('');

  // NG OnInit
  ngOnInit(): void {
    const cart = localStorage.getItem('my-cart');

    this.callback.set(this._route.snapshot.queryParamMap.get('callback'));
    console.log(this.callback());

    if (cart) {
      this.productsCart.set(JSON.parse(cart));
    }
    this.productId.set(String(this._route.snapshot.paramMap.get('id')));

    this.getProduct();
  }
  navigate() {
    const targetUrl = this.callback();
    if (targetUrl) {
      this._router.navigateByUrl(`/?${targetUrl}`);
    }
  }
  // Render The Product Details
  getProduct() {
    this._productService.getProductById(this.productId()).subscribe({
      next: (payload) => {
        console.log(payload);

        this.product.set(payload.data);
      },
      error: (err) => {
        // Future: Be A UI Component For The Error
        console.log(err.error.message);
      },
    });
  }

  // Add This Product To The Cart
  addToCart() {
    if (this._authService.isAuthenticated()) {
      this.addToUserCart();
      // Toaster
      this._toaster.success(`product added to cart!`, 'Success');
    } else {
      if (this.quantity() <= 1) {
        this.addToGuestCart();
        // Toaster
        this._toaster.success(`product added to cart!`, 'Success');
      }
    }
  }

  // Add The Product To The Cart <Guest>
  addToGuestCart() {
    const product = this.product();
    const quantity = this.quantity();

    this.productsCart.update((cart) => {
      const index = cart.findIndex((item) => item.product.id === product?._id);

      if (index !== -1) {
        return [...cart];
      }

      // new product
      return [...cart, { product, quantity }];
    });

    localStorage.setItem('my-cart', JSON.stringify(this.productsCart()));
  }

  // Add The Product To The Cart <User Has Token>
  addToUserCart() {
    this._cartService.addToCart(this.productId()).subscribe({
      next: (payload: any) => {
        console.log(payload);
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }
}
