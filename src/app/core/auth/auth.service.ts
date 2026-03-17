import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HEADER_API, BASE_API } from '../../lib/constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Injectable
  private _http = inject(HttpClient);
  private _router = inject(Router);

  // Signals
  private readonly _api: string = `${BASE_API}/users`;
  private _token = signal<string | null>(localStorage.getItem('token'));
  isAuthenticated = computed(() => !!this._token());

  // Register
  register(user: RegisterForm): Observable<any> {
    return this._http.post(`${this._api}/add`, user, {
      headers: { ...HEADER_API },
    });
  }

  // Login
  login(user: LoginForm): Observable<any> {
    return this._http.post(`${this._api}/login`, user, {
      headers: { ...HEADER_API },
    });
  }

  // Logout
  logout() {
    this._token.set('');
    this._router.navigate(['/login']);
  }
}
