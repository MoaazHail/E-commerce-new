import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { HEADER_API } from '../../lib/constants/api.constants';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Http Client
  private _http = inject(HttpClient);
  private _authService = inject(AuthService);
  private _apiUrl = `${environment.apiUrl}/products`;

  getProducts(): Observable<any> {
    return this._http.get(this._apiUrl);
  }

  // Get Product Using page , limit
  getAllProducts(page: number, limit: number): Observable<any> {
    return this._http.get(`${this._apiUrl}?limit=${limit}&page=${page}`); // ?page=3&limit=12
  }

  // Get Product Using skip , limit
  getTodays(): Observable<any> {
    return this._http.get(`${this._apiUrl}?page=3&limit=12`);
  }

  // Get Product By ID
  getProductById(id: string): Observable<any> {
    return this._http.get(`${this._apiUrl}/${id}`);
  }

  // searchProduct(search: string): Observable<any> {
  //   return this._http.get(`${this._apiUrl}/search?q=${search}`);
  // }

  addProduct(form: any): Observable<any> {
    return this._http.post(
      `${this._apiUrl}`,
      {
        name: form.name,
        description: form.name,
        price: form.price,
        category: form.category,
        stock: form.stock,
      },
      { headers: { ...HEADER_API, Authorization: `Bearer ${this._authService.token()}` } },
    );
  }

  updateProduct(form: any, productId: string): Observable<any> {
    return this._http.patch(
      `${this._apiUrl}/${productId}`,
      {
        name: form.name,
        description: form.description,
        price: form.price,
        category: form.category,
        stock: form.stock,
      },
      { headers: { ...HEADER_API, Authorization: `Bearer ${this._authService.token()}` } },
    );
  }

  // Delete A Product
  deleteProduct(productId: string): Observable<any> {
    return this._http.delete(`${this._apiUrl}/${productId}`, {
      headers: { ...HEADER_API, Authorization: `Bearer ${this._authService.token()}` },
    });
  }

  // Search By Product Name
  searchProduct(keyword: string | null, page?: number, limit?: number): Observable<any> {
    return this._http.get(`${this._apiUrl}/search?keyword=${keyword}&page=${page}&limit=${limit}`, {
      headers: { ...HEADER_API, Authorization: `Bearer ${this._authService.token()}` },
    });
  }
}
