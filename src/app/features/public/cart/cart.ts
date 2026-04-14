import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { GustCart, UserCart } from '../../../lib/types/cart';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../../core/services/order.service';
import { ToastrService } from 'ngx-toastr';

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
  private _orderService = inject(OrderService);
  private _toasterService = inject(ToastrService);

  // Inject Cart Service
  private _cartService = inject(CartService);

  // Signals
  totalPrice = signal<number | undefined>(0);
  userQuantity = signal<number>(1);
  guestCart = signal<GustCart[] | null>(null);
  checkoutType = signal<'Cash' | 'Visa'>('Visa');
  cashOrder = signal<{}>({});
  isError = signal<string | null>(null);
  isUpdated = signal<boolean>(false);
  productsCart = signal(this._cartService.productsCart());

  // Form
  public addressForm: FormGroup = new FormGroup({
    details: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
  });

  // Ng OnInit
  ngOnInit() {
    this.getGuestCart();
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
    localStorage.removeItem('my-cart');
    this.guestCart.update((_) => {
      return [];
    });
    this._cartService.deleteCart().subscribe({
      next: (payload) => {
        console.log(payload);
        this._toasterService.success('Cart cleared successfully!', 'Success');
      },
      error: (err) => {
        console.log(err);
        // this.isError();
      },
    });
    this.isUpdated.set(false);
    this._cartService.productsCart.update((last) => (last = 0));
  }

  // Update Quantity
  // Increment
  increaseUserQuantity(productId: string, quantity: number) {
    this.guestCart.update((cart) => {
      const safeCart = cart ?? [];

      const updatedCart = safeCart.map((item) => {
        if (item.product._id === productId) {
          return { ...item, quantity: quantity + 1 };
        }
        return item;
      });

      // Save the updated array to localStorage
      localStorage.setItem('my-cart', JSON.stringify(updatedCart));

      return updatedCart;
    });
    this.isUpdated.set(false);
  }

  // Decrement
  decreaseQuantity(productId: string, quantity: number) {
    this.guestCart.update((cart) => {
      const safeCart = cart ?? [];

      const updatedCart = safeCart.map((item) => {
        if (item.product._id === productId) {
          return { ...item, quantity: quantity - 1 };
        }
        return item;
      });

      // Save the updated array to localStorage
      localStorage.setItem('my-cart', JSON.stringify(updatedCart));

      return updatedCart;
    });
    this.isUpdated.set(false);
  }

  // Remove Item
  removeItem(productId: string) {
    this.guestCart.update((cart) => {
      const safeCart = cart ?? [];

      return safeCart.filter((item) => item.product._id !== productId);
    });

    localStorage.setItem('my-cart', JSON.stringify(this.guestCart()));

    this._toasterService.info('Product removed from cart', 'Warning');
    this.isUpdated.set(false);
    this._cartService.productsCart.update((last) => last - 1);
  }

  saveChanges() {
    const storage = localStorage.getItem('my-cart');
    if (storage) {
      const data: [any] = JSON.parse(storage);
      console.log(data);
      this.guestCart.set(data);
      data.map((product) => {
        this._cartService.addToCart(product.product._id, product.quantity).subscribe({
          next: (payload) => {
            console.log(payload);
            this.totalPrice.set(payload.data.totalPrice);
            this._toasterService.success(`the cart is creating!`, 'Success');
          },
          error: (err) => {
            console.log(err.error.message);
            this.isError.set(err.error.message);
          },
        });
      });
      this.isUpdated.set(true);
    }
  }

  // Create Order
  CreateCashOrder() {
    console.log(this.addressForm.value);
    console.log(this.guestCart());

    this._orderService.createCashOrder(this.addressForm.value).subscribe({
      next: (payload) => {
        console.log(payload);
        //Add Toaster To UX
        this._toasterService.success(`the order is creating!`, 'Success');
        this.guestCart.set([]);
        localStorage.removeItem('my-cart');
        this._cartService.productsCart.update((last) => (last = 0));
      },
      error: (err) => {
        console.log(err.error);
        this.isError.set(err.error.message);
      },
    });
    this.isUpdated.set(false);
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
