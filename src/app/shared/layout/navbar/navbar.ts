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
import { ProductService } from '../../../core/services/poduct.service';
import { Product } from '../../../lib/types/product';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private _router = inject(Router);
  protected authService = inject(AuthService);
  public callbackService = inject(CallbackService);
  private _productService = inject(ProductService);
  private _cartService = inject(CartService);

  isAuth = signal(false);
  cartCount = signal(0);
  search = signal<string | null>(null);
  searchControl = new FormControl('');
  searchResults = signal<Product[]>([]);
  clicked = signal<boolean>(false);

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((value) => {
        console.log('Search Value:', value);
        this.search.set(value);
        if (this.search()) {
          this.searchProduct();
        }
      });
  }

  constructor() {
    effect(() => {
      this.isAuth.set(this.authService.isAuthenticated());
      this.cartCount.set(this._cartService.productsCart());
      this.search();
    });
  }

  searchProduct() {
    console.log('search is run');

    this._productService.searchProduct(this.search(), 1, 30).subscribe({
      next: (payload) => {
        console.log(payload);
        this.searchResults.set(payload.data.products);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  productDetails(id: string) {
    this._router.navigate(['products', id]);
    this.searchResults.set([]);
  }
}
