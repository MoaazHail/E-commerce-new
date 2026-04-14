import { inject, Injectable } from '@angular/core';
import { HEADER_API } from '../../lib/constants/api.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly _api = `${environment.apiUrl}/order`;
  private _http = inject(HttpClient);
  private _authService = inject(AuthService);

  // Create Order
  createCashOrder(shippingAddress: any): Observable<any> {
    return this._http.post(
      `${this._api}`,
      {
        shippingAddress: {
          city: shippingAddress.city,
          details: shippingAddress.details,
          phone: shippingAddress.phone,
          postalCode: shippingAddress.postalCode,
        },
      },
      { headers: { ...HEADER_API, Authorization: `Bearer ${this._authService.token()}` } },
    );
  }

  getMyOrders(): Observable<any> {
    return this._http.get(this._api, {
      headers: { ...HEADER_API, Authorization: `Bearer ${this._authService.token()}` },
    });
  }

  getAllOrder(): Observable<any> {
    return this._http.get(`${this._api}/all`, {
      headers: { ...HEADER_API, Authorization: `Bearer ${this._authService.token()}` },
    });
  }

  updateOrder(orderId: string, status: any): Observable<any> {
    return this._http.patch(
      `${this._api}/${orderId}`,
      {
        isDelivered: status.isDelivered,
        isPaid: status.isPaid,
      },
      { headers: { ...HEADER_API, Authorization: `Bearer ${this._authService.token()}` } },
    );
  }

  deleteOrder(orderId: string): Observable<any> {
    return this._http.delete(`${this._api}/${orderId}`, {
      headers: { ...HEADER_API, Authorization: `Bearer ${this._authService.token()}` },
    });
  }
}
