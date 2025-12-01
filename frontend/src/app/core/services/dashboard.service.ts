import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface DashboardOverviewResponse {
  overview: {
    totalUsers: number;
    activeSessions: number;
    totalSales: number;
    totalRevenue: number;
  };
  charts: {
    signupsOverTime: {
      labels: string[];
      data: number[];
    };
    salesByCategory: {
      labels: string[];
      data: number[];
    };
  };
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private apiUrl = 'http://localhost:5000/api/dashboard';

  constructor(private http: HttpClient) {}

  getOverview(): Observable<DashboardOverviewResponse> {
    return this.http.get<DashboardOverviewResponse>(`${this.apiUrl}/overview`);
  }
}
