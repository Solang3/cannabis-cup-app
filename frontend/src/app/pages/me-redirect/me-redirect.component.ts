import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-me-redirect',
  standalone: true,
  template: `<p>Redirecting to your profile...</p>`
})
export class MeRedirectComponent implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const username = payload?.username;
      if (username) {
        this.router.navigate(['/u', username]);
      } else {
        this.router.navigate(['/login']);
      }
    } catch (err) {
      this.router.navigate(['/login']);
    }
  }
  
}
