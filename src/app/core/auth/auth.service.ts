import { computed, inject, Injectable, signal } from '@angular/core';
import { BASE_API, HEADER_API } from './auth.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _api: string = `${BASE_API}/users`;
  private _http = inject(HttpClient);
  private _token = signal<string | null>(localStorage.getItem('token'));
  public isAuthenticated = computed(() => !!this._token());

  constructor(private router: Router) {}
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

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
