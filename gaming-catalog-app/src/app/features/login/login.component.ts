import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; // Adjust path as needed

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  model: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const { username, password } = this.model;
    this.authService.login(username, password).subscribe({
      next: (user) => {
        this.router.navigate(['/Game/All']);
        console.log('Logged in successfully', user);
      },
      error: (error) => console.error('Login failed', error),
    });
  }
}
