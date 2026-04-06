import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const userGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  return !authService.isAuthenticated();
};

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  // Assuming your authService has a user signal or method
  const user = authService.currentUser(); // Adjust based on your actual signal name

  if (user && user.role === 'admin') {
    return true;
  }

  // If not admin, show a warning and redirect
  toastr.error('Access Denied: Admins Only', 'Restricted Area');
  router.navigate(['/']);
  return false;
};
