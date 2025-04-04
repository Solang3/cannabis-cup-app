// src/app/pages/event-landing/event-landing.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-landing',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './event-landing.component.html',
  styleUrls: ['./event-landing.component.scss']
})
export class EventLandingComponent implements OnInit {
  slug = '';
  event: any;
  loading = true;
  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.isLoggedIn = !!localStorage.getItem('token'); // ✅ store token status
  
    this.http.get(`http://localhost:5050/api/events/${this.slug}`).subscribe({
      next: (res) => {
        this.event = res;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  joinEvent() {
    const token = localStorage.getItem('token');
    if (!token || !this.event?._id) return;
  
    this.http.post(
      `http://localhost:5050/api/events/${this.event._id}/join`,
      { role: 'competitor' },
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe({
      next: () => {
        alert('You joined the event!');
        this.router.navigate(['/events', this.slug, 'enter']); // go to flower form
      },
      error: (err) => {
        console.error(err);
        alert(err?.error?.message || 'Join failed');
      }
    });
  }
  
  
}
