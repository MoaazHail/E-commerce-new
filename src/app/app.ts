import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('dashboard');
  token = signal<string | null>(null);
  protected authService = inject(AuthService);
}
