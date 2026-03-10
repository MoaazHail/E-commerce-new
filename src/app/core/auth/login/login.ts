import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

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

  ngOnInit(): void {
    this.onSubmit();
  }

  constructor(private loginService: AuthService) {
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
        },
        error(err) {
          console.log(err);
        },
      });
    }
  }
}
