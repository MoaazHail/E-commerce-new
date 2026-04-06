import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-auth-layout',
  standalone: false,
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {
  // Injectable
  private _router = inject(Router);
  // 1. Create a signal that tracks the current URL
  private urlSignal = toSignal(
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this._router.url),
    ),
    { initialValue: this._router.url },
  );

  // 2. Derive your booleans from the URL signal
  // This will update automatically whenever the route changes!
  public isLogin = computed(() => this.urlSignal()?.includes('login'));
  public isRegister = computed(() => this.urlSignal()?.includes('register'));
  public isForgotPassword = computed(() => this.urlSignal()?.includes('forgot-password'));
}
