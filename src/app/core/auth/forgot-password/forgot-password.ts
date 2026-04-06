import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  // Injectable
  // private _authService = inject(AuthService);
  // private _router = inject(Router);
  private _toaster = inject(ToastrService);

  // Signals
  public apiError = signal<string>('');
  public showPassword = signal<boolean>(false);
  public isLoading = signal<boolean>(false);

  // Forms
  public forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  // Submit Forgot Password Form
  onSubmit() {
    if (this.forgotPasswordForm.invalid) return;

    //  Forgot Password API
    // this._authService
    //   .login(this.forgotPasswordForm.value)
    //   .pipe(finalize(() => this.isLoading.set(false)))
    //   .subscribe({
    //     next: (data) => {
    //       localStorage.setItem('token', data.accessToken);
    //       this._router.navigate(['/']);
    //     },
    //     error: (err) => {
    //       this.apiError.set(err?.error?.message || 'An error occurred');
    //     },
    //   });
    this.isLoading.set(true);

    // Set Time Out
    setTimeout(() => {
      console.log(this.forgotPasswordForm.value);
      this.isLoading.set(false);
      this._toaster.success(`OTP secret is sending!`, 'Success');
    }, 3000);
  }
}
