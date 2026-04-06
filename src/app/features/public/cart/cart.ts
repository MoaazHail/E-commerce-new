import { Component, inject, OnInit, signal } from '@angular/core';
import { GustCart, UserCart } from '../../../lib/types/cart';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  // Inject Auth Service
  authService = inject(AuthService);
  private _router = inject(Router);

  // Inject Cart Service
  cartService = inject(CartService);

  // Signals
  userCart = signal<UserCart | null>(null);
  total = signal<number | undefined>(0);

  guestCart = signal<GustCart | null>(null);

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.getUserCart();
    } else {
      this.getGuestCart();
    }
  }

  // Display The User Cart
  getUserCart() {
    this.cartService.getCart(1).subscribe({
      next: (payload) => {
        console.log(payload);
        this.userCart.set(payload);
        this.total.set(this.userCart()?.total);
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  // Display The Guest Cart
  getGuestCart() {
    const storedCart = localStorage.getItem('my-cart');

    if (storedCart) {
      this.guestCart.set(JSON.parse(storedCart));
    }
  }

  // Delete The User Cart
  deleteCart() {
    if (this.authService.isAuthenticated()) {
      this.cartService.deleteCart(this.userCart()!.id);
    }
  }

  // Update Quantity
  // Increment
  increaseQuantity(id: number, quantity: number) {
    this.cartService.increaseQuantity(1, id, quantity).subscribe({
      next: (payload) => {
        console.log(payload);
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }
  // Decrement
  decreaseQuantity(id: number, quantity: number) {
    this.cartService.decreaseQuantity(1, id, quantity).subscribe({
      next: (payload) => {
        console.log(payload);
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  navigate() {
    const callback = this._router.url;
    this._router.navigate(['auth/login'], {
      queryParams: {
        callback: `/${callback}`,
      },
    });
  }
}
