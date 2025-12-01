import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './shared/layout/sidebar.component';
import { NavbarComponent } from './shared/layout/navbar.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, NavbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Admin Dashboard';
  isAuthenticated = computed(() => this.authService.isAuthenticated());

  constructor(private authService: AuthService) {}
}
