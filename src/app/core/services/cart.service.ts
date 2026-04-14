import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HEADER_API } from '../../lib/constants/api.constants';
import { Product } from '../../lib/types/product';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // API url
  private readonly _apiUrl = `${environment.apiUrl}/cart`;

  // ----- Injectable ------
  private _authService = inject(AuthService);
  private _http = inject(HttpClient);

  // ------- Signals -------
  public cart = signal<{ product: Product; quantity: number; length: number }[]>(
    JSON.parse(localStorage.getItem('my-cart') || '[]'),
  );
  productsCart = signal<number>(this.cart().length);
  // Add To Cart
  addToCart(id: string, quantity?: number): Observable<any> {
    if (!quantity) {
      quantity = 1;
    }
    this.productsCart.set(0);
    return this._http.post(
      `${this._apiUrl}`,
      { productId: id, quantity },
      { headers: { ...HEADER_API, Authorization: `Bearer ${this._authService.token()}` } },
    );
  }

  // Get User Cart
  getCart(): Observable<any> {
    return this._http.get(this._apiUrl, {
      headers: { ...HEADER_API, Authorization: `Bearer ${this._authService.token()}` },
    });
  }

  // Delete User Cart
  deleteCart(): Observable<any> {
    return this._http.delete(this._apiUrl, {
      headers: { ...HEADER_API, Authorization: `Bearer ${this._authService.token()}` },
    });
  }

  // Update User Cart
  updateQuantity(productId: string, quantity: number): Observable<any> {
    return this._http.patch(
      `${this._apiUrl}/update-quantity/${productId}`,
      {
        quantity,
      },
      {
        headers: { ...HEADER_API, Authorization: `Bearer ${this._authService.token()}` },
      },
    );
  }

  // Remove Product
  removeItem(productId: string): Observable<any> {
    return this._http.delete(`${this._apiUrl}/${productId}`, {
      headers: { ...HEADER_API, Authorization: `Bearer ${this._authService.token()}` },
    });
  }
}
