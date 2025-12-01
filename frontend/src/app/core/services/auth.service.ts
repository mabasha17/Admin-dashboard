import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';

  private _token = signal<string | null>(null);
  private _currentUser = signal<LoginResponse['user'] | null>(null);

  token = computed(() => this._token());
  currentUser = computed(() => this._currentUser());
  isAuthenticated = computed(() => !!this._token());

  constructor(private http: HttpClient, private router: Router) {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      this._token.set(storedToken);
      this._currentUser.set(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((res) => {
          this._token.set(res.token);
          this._currentUser.set(res.user);
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
        })
      );
  }

  register(
    name: string,
    email: string,
    password: string
  ): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/register`, {
        name,
        email,
        password,
      })
      .pipe(
        tap((res) => {
          this._token.set(res.token);
          this._currentUser.set(res.user);
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
        })
      );
  }

  logout(): void {
    this._token.set(null);
    this._currentUser.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getRole(): 'admin' | 'user' | null {
    return this._currentUser()?.role ?? null;
  }
}
