import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // Injectable
  private _authService = inject(AuthService);
  private _route = inject(ActivatedRoute);

  private _toaster = inject(ToastrService);

  // Signals
  public apiError = signal<string>('');
  public showPassword = signal<boolean>(false);
  public isLoading = signal<boolean>(false);

  // Forms
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  // Submit Login Form
  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);

    this._authService
      .login(this.loginForm.value)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (payload) => {
          console.log(payload);

          this._toaster.success(`Login successfully!`, 'Success');
          this._authService.handleLoginSuccess(
            payload.token,
            payload.user,
            this._route.snapshot.queryParamMap.get('callback'),
          );
        },
        error: (err) => {
          this._toaster.error(`An error occurred!`, 'Error');
          this.apiError.set(err?.error?.message || 'An error occurred');
        },
      });
  }
}
