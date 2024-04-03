import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  model: any = {};

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.authService
      .register(this.model.username, this.model.password)
      .subscribe({
        next: () => {
          // Handle successful registration
          console.log('Registration successful');
          this.router.navigate(['/Login']);
        },
        error: (error) => {
          console.error('Registration failed', error);
        },
      });
  }
}
