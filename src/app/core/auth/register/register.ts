import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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
export class Register implements OnInit {
  showPassword: boolean = false;

  apiError: string = '';

  // Forms
  registerForm: FormGroup;

  ngOnInit(): void {
    this.onSubmit();
  }
  constructor(private registerService: AuthService) {
    this.registerForm = new FormGroup(
      {
        nameDetails: new FormGroup({
          firstName: new FormControl('', [Validators.required]),
          maidenName: new FormControl('', [Validators.required]),
          lastName: new FormControl('', [Validators.required]),
        }),
        gender: new FormControl(''),
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl(''),
        age: new FormControl(null, [Validators.required]),
      },
      { validators: passwordMatchValidator },
    );
  }

  onSubmit() {
    const values: RegisterForm = {
      firstName: this.registerForm.get('nameDetails.firstName')?.value,
      lastName: this.registerForm.get('nameDetails.lastName')?.value,
      maidenName: this.registerForm.get('nameDetails.maidenName')?.value,
      gender: this.registerForm.get('gender')?.value,
      age: this.registerForm.get('age')?.value,
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
    };

    if (values.firstName !== '') {
      this.registerService.register(values).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
          this.apiError = err?.error?.message;
        },
      });
    }
  }
}
