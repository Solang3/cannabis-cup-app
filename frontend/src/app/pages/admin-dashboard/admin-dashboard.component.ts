import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.http.get<any[]>('http://localhost:5050/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => this.users = data,
      error: err => console.error(err)
    });
  }

  promote(userId: string, role: string) {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.http.patch(`http://localhost:5050/api/admin/users/${userId}/role`,
      { role, approved: true },
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe({
      next: () => this.loadUsers(),
      error: err => alert(err?.error?.message || 'Error updating role')
    });
  }
}
