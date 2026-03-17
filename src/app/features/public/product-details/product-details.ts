import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/home';
import { AuthService } from '../../../core/auth/auth.service';
import { Product } from '../../../lib/types/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  // Injectable
  // Inject Route
  route = inject(ActivatedRoute);

  // Inject Toastr
  toaster = inject(ToastrService);
  // Inject Product Service
  productService = inject(ProductService);

  // Inject Auth Service
  authService = inject(AuthService);

  // Signals
  product = signal<Product | null>(null);
  productId = signal<number>(NaN);
  productsCart = signal<{ product: any; quantity: number }[]>([]);
  quantity = signal<number>(1);

  // NG OnInit
  ngOnInit(): void {
    const cart = localStorage.getItem('my-cart');

    if (cart) {
      this.productsCart.set(JSON.parse(cart));
    }
    this.productId.set(Number(this.route.snapshot.paramMap.get('id')));

    this.getProduct();
  }

  // Render The Product Details
  getProduct() {
    this.productService.getProductById(this.productId()).subscribe({
      next: (payload) => {
        this.product.set(payload);
      },
      error: (err) => {
        // Future: Be A UI Component For The Error
        console.log(err.error.message);
      },
    });
  }

  // Add This Product To The Cart
  addToCart() {
    if (this.authService.isAuthenticated()) {
      this.addToUserCart();
      // Toaster
      this.toaster.success(`product added to cart!`, 'Success');
    } else {
      if (this.quantity() <= 1) {
        this.addToGuestCart();
        // Toaster
        this.toaster.success(`product added to cart!`, 'Success');
      }
    }
  }

  // Add The Product To The Cart <Guest>
  addToGuestCart() {
    const product = this.product();
    const quantity = this.quantity();

    this.productsCart.update((cart) => {
      const index = cart.findIndex((item) => item.product.id === product?.id);

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
    this.productService.addToCart(this.productId()).subscribe({
      next: (payload: any) => {
        console.log(payload);
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }
}
