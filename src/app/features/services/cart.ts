import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API, HEADER_API } from '../../lib/constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly _api = `${BASE_API}/carts`;
  private _http = inject(HttpClient);

  // Get User Cart
  getCart(cartId: number): Observable<any> {
    return this._http.get(`${this._api}/${cartId}`);
  }

  // Delete User Cart
  deleteCart(cartId: number): Observable<any> {
    return this._http.delete(`${this._api}/${cartId}`, { headers: { ...HEADER_API } });
  }

  // Update User Cart
  // Increase A Quantity Of Specific Product
  increaseQuantity(cartId: number, productId: number, quantity: number): Observable<any> {
    return this._http.patch(`${this._api}/${cartId}`, {
      merge: true,
      products: [{ id: productId, quantity: quantity + 1 }],
    });
  }

  // Decrease A Quantity Of Specific Product
  decreaseQuantity(cartId: number, productId: number, quantity: number): Observable<any> {
    return this._http.patch(`${this._api}/${cartId}`, {
      merge: true,
      products: [{ id: productId, quantity: quantity - 1 }],
    });
  }
}
