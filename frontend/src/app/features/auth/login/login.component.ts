import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.error = 'Email and password are required';
      return;
    }

    this.loading = true;
    this.error = null;

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        const returnUrl =
          this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Login failed';
      },
    });
  }
}
