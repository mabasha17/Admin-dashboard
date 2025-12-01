import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UserListComponent } from './features/users/user-list.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'users',
        component: UserListComponent,
        canActivate: [adminGuard],
      },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideCharts(withDefaultRegisterables()),
  ],
};
