import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly _api = `${environment.apiUrl}/category`;
  private _http = inject(HttpClient);

  getAllCategories(): Observable<any> {
    return this._http.get(this._api);
  }

  getCategoryBySlogan(slog: string): Observable<any> {
    return this._http.get(`${environment.apiUrl}/products/category/${slog}`);
  }
}
