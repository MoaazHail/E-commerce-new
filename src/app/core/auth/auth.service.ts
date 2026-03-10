import { inject, Injectable } from '@angular/core';
import { BASE_API, HEADER_API } from './auth.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _api: string = `${BASE_API}/users`;
  private _http = inject(HttpClient);

  register(user: RegisterForm): Observable<any> {
    return this._http.post(`${this._api}/add`, user, {
      headers: { ...HEADER_API },
    });
  }

  login(user: LoginForm): Observable<any> {
    return this._http.post(`${this._api}/login`, user, {
      headers: { ...HEADER_API },
    });
  }
}
