import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../core/services/dashboard.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  overview = {
    totalUsers: 0,
    activeSessions: 0,
    totalSales: 0,
    totalRevenue: 0,
  };

  loading = false;
  error: string | null = null;

  // Line Chart: User Sign-ups over time
  public signupsLineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'User Sign-ups',
        fill: true,
        tension: 0.4,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        pointBackgroundColor: 'rgb(75, 192, 192)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(75, 192, 192)',
        borderWidth: 2,
      },
    ],
  };

  public signupsLineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  // 👇 Narrow type to literal "line"
  public signupsLineChartType: 'line' = 'line';

  // Doughnut Chart: Sales by Category
  public salesDoughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(199, 199, 199, 0.8)',
          'rgba(83, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
          'rgba(83, 102, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  public salesDoughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ₹${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  // 👇 Narrow type to literal "doughnut"
  public salesDoughnutChartType: 'doughnut' = 'doughnut';

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  private fetchDashboardData() {
    this.loading = true;
    this.error = null;

    this.dashboardService.getOverview().subscribe({
      next: (res) => {
        this.loading = false;
        this.overview = res.overview;

        // Line chart - Update with new data
        if (res.charts.signupsOverTime && res.charts.signupsOverTime.labels) {
          this.signupsLineChartData = {
            labels: res.charts.signupsOverTime.labels,
            datasets: [
              {
                data: res.charts.signupsOverTime.data,
                label: 'User Sign-ups',
                fill: true,
                tension: 0.4,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                pointBackgroundColor: 'rgb(75, 192, 192)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
              },
            ],
          };
        }

        // Doughnut chart - Update with new data
        if (res.charts.salesByCategory && res.charts.salesByCategory.labels) {
          this.salesDoughnutChartData = {
            labels: res.charts.salesByCategory.labels,
            datasets: [
              {
                data: res.charts.salesByCategory.data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(255, 206, 86, 0.8)',
                  'rgba(75, 192, 192, 0.8)',
                  'rgba(153, 102, 255, 0.8)',
                  'rgba(255, 159, 64, 0.8)',
                  'rgba(199, 199, 199, 0.8)',
                  'rgba(83, 102, 255, 0.8)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(199, 199, 199, 1)',
                  'rgba(83, 102, 255, 1)',
                ],
                borderWidth: 2,
              },
            ],
          };
        }

        // Force change detection to update charts
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Failed to load dashboard data';
      },
    });
  }
}
