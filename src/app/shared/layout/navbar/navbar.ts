import {
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  OnChanges,
  OnInit,
  signal,
} from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';
import { CallbackService } from '../../../core/services/callback.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private _router = inject(Router);
  protected authService = inject(AuthService);
  public callbackService = inject(CallbackService);
  // pages = signal()

  isAuth = signal(false);
  private homeComp = inject(CartService);
  cd = inject(ChangeDetectorRef);

  constructor() {
    effect(() => {
      this.isAuth.set(this.authService.isAuthenticated());
    });
  }

  cartCount = computed(() => {
    const items = this.homeComp.productsCart();
    return items.reduce((total, item) => total + item.quantity, 0);
  });
}
