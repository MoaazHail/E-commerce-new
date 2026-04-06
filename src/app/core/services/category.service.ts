import { inject, Injectable } from '@angular/core';
import { BASE_API } from '../../lib/constants/api.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly _api = `${BASE_API}/products/categories`;
  private _http = inject(HttpClient);

  getAllCategories(): Observable<any> {
    return this._http.get(this._api);
  }

  getCategoryBySlogan(slog: string): Observable<any> {
    return this._http.get(`${BASE_API}/products/category/${slog}`);
  }
}
