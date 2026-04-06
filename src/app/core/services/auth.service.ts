import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HEADER_API, BASE_API } from '../../lib/constants/api.constants';
import { User } from '../../lib/types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Injectable
  private _http = inject(HttpClient);
  private _router = inject(Router);

  // Signals
  private readonly _api: string = `${BASE_API}/users`;
  token = signal<string | null>(localStorage.getItem('token'));
  isAuthenticated = computed(() => (this.token() ? true : false));

  currentUser = signal<User | null>(null);

  constructor() {
    const savedUser = localStorage.getItem('user_data');
    if (savedUser) {
      this.currentUser.set(JSON.parse(savedUser));
    }
  }

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

  handleLoginSuccess(token: string, userData: User, callback?: string | null) {
    // 1. Update Storage
    localStorage.setItem('token', token);
    localStorage.setItem('user_data', JSON.stringify(userData));
    console.log(callback);

    // 2. Update Signals
    this.token.set(token);
    this.currentUser.set(userData);

    // 3. Navigate home
    if (callback) {
      this._router.navigate([callback]);
    } else {
      this._router.navigate(['/']);
    }
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');

    this.token.set(null);
    this.currentUser.set(null);

    // 3. Redirect the user
    this._router.navigate(['auth/login']);
  }
}
