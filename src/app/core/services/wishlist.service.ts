import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HEADER_API } from '../../lib/constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private _http = inject(HttpClient);
  private _authService = inject(AuthService);
  private readonly _apiUrl = `${environment.apiUrl}/wishlist`;

  // Add & Remove Item In Wishlist
  toggleWishlist(productId: string): Observable<any> {
    return this._http.post(
      this._apiUrl,
      { productId },
      {
        headers: { ...HEADER_API, Authorization: `Bearer ${this._authService.token()}` },
      },
    );
  }

  // Get Wishlist
  getWishlist(): Observable<any> {
    return this._http.get(this._apiUrl, {
      headers: { ...HEADER_API, Authorization: `Bearer ${this._authService.token()}` },
    });
  }
}
