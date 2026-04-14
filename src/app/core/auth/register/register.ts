import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { passwordMatchValidator } from '../../../lib/validations/validator';

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
  private _route = inject(ActivatedRoute);

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
      password: this.registerForm.get('password')?.value,
      email: this.registerForm.get('email')?.value,
    };
    console.log(values);

    if (this.registerForm.invalid) return;

    this._authServer
      .register(values)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (payload) => {
          console.log(payload);
          this._authServer.handleLoginSuccess(
            payload.token,
            payload.user,
            this._route.snapshot.queryParamMap.get('callback'),
          );
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
