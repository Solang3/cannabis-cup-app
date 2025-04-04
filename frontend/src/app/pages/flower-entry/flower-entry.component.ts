import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-flower-entry',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './flower-entry.component.html',
  styleUrls: ['./flower-entry.component.scss']
})
export class FlowerEntryComponent implements OnInit {
  form!: FormGroup;
  slug = '';
  eventId = '';
  loading = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.form = this.fb.group({
      name: ['', Validators.required],
      method: ['indoor', Validators.required]
    });

    this.http.get<any>(`http://localhost:5050/api/events/${this.slug}`).subscribe({
      next: (res) => {
        this.eventId = res._id;
        this.loading = false;
      },
      error: () => {
        alert('Event not found');
        this.router.navigate(['/']);
      }
    });
  }

  submit(): void {
    if (!this.form.valid || !this.eventId) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in!');
      return;
    }

    this.http.post(
      `http://localhost:5050/api/entries/${this.eventId}`,
      this.form.value,
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe({
      next: () => {
        alert('Flower submitted!');
        this.router.navigate(['/events', this.slug]);
      },
      error: (err) => {
        console.error(err);
        alert(err?.error?.message || 'Submission failed');
      }
    });
  }
}
