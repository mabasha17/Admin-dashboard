import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface User {
  _id: string;
  id?: string; // For compatibility
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  private apiUrl = 'http://localhost:5000/api/users'; // Implement on backend
  users: User[] = [];
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true;
    this.error = null;

    this.http.get<User[]>(this.apiUrl).subscribe({
      next: (res) => {
        this.loading = false;
        // Map _id to id for compatibility
        this.users = res.map(user => ({ ...user, id: user._id }));
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Failed to load users';
      },
    });
  }

  promote(user: User) {
    const userId = user._id || user.id;
    this.http.patch<User>(`${this.apiUrl}/${userId}/promote`, {}).subscribe({
      next: () => {
        this.fetchUsers();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to promote user';
      },
    });
  }

  toggleStatus(user: User) {
    const userId = user._id || user.id;
    this.http.patch<User>(`${this.apiUrl}/${userId}/status`, {}).subscribe({
      next: () => {
        this.fetchUsers();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to update user status';
      },
    });
  }

  delete(user: User) {
    if (!confirm(`Delete user ${user.name}?`)) {
      return;
    }

    const userId = user._id || user.id;
    this.http.delete(`${this.apiUrl}/${userId}`).subscribe({
      next: () => {
        this.fetchUsers();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to delete user';
      },
    });
  }
}
