import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_API, HEADER_API } from '../../lib/constants/api.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Http Client
  private _http = inject(HttpClient);

  // Get All Product
  getAllProducts(skip: number, limit: number): Observable<any> {
    return this._http.get(`${BASE_API}/products?limit=${limit}&skip=${skip}`);
  }

  // Get Product By ID
  getProductById(id: number): Observable<any> {
    return this._http.get(`${BASE_API}/products/${id}`);
  }

  // Add To Cart
  addToCart(id: number, quantity?: number): Observable<any> {
    if (!quantity) {
      quantity = 1;
    }
    return this._http.post(
      `${BASE_API}/carts/add`,
      { userId: 1, products: [{ id, quantity }] }, // UserId Must Be Take On NgRX Store !!?
      { headers: { ...HEADER_API } },
    );
  }
}
