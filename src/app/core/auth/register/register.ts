import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value
    ? { passwordMismatch: true }
    : null;
};

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  // Injectable
  private _authServer = inject(AuthService);
  private _toaster = inject(ToastrService);

  // Signals
  showPassword = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  apiError = signal<string>('');

  // Forms
  registerForm: FormGroup = new FormGroup(
    {
      nameDetails: new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        maidenName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
      }),
      age: new FormControl(null, [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl(''),
    },
    { validators: passwordMatchValidator },
  );

  onSubmit() {
    // Loading
    this.isLoading.set(true);

    // Register Value
    const values: RegisterForm = {
      firstName: this.registerForm.get('nameDetails.firstName')?.value,
      lastName: this.registerForm.get('nameDetails.lastName')?.value,
      maidenName: this.registerForm.get('nameDetails.maidenName')?.value,
      gender: this.registerForm.get('gender')?.value,
      age: this.registerForm.get('age')?.value,
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      email: this.registerForm.get('email')?.value,
    };

    if (this.registerForm.invalid) return;

    this._authServer
      .register(values)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (data) => {
          this._toaster.success(`Register successfully!`, 'Success');
        },
        error: (err) => {
          console.log(err);
          this.apiError.set(err?.error?.message);
          this._toaster.error(`An error occurred!`, 'Error');
        },
      });
  }
}
