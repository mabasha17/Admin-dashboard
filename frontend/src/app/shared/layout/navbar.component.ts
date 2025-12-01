import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  user = computed(() => this.authService.currentUser());

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
