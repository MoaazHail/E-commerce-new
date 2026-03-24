import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  showPassword: boolean = false;

  // Forms
  loginForm: FormGroup;

  //
  apiError: string = '';

  ngOnInit(): void {
    this.onSubmit();
  }

  constructor(
    private loginService: AuthService,
    private router: Router,
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  onSubmit() {
    let values: LoginForm = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    if (values.password !== '') {
      this.loginService.login(values).subscribe({
        next: (data) => {
          console.log(data);

          localStorage.setItem('token', data.accessToken);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          this.apiError = err?.error?.message;
        },
      });
    }
  }
}
