// src/app/pages/create-event/create-event.component.ts
import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      location: [''],
      description: [''],
      ticketPrice: [0, Validators.min(0)]
    });    
  }

  submit(): void {
    if (this.form.invalid) return;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post<any>('http://localhost:5050/api/events', this.form.value, { headers })
      .subscribe({
        next: (res) => {
          alert('✅ Evento creado!');
          this.router.navigate(['/events', res.event.slug]);
        },
        error: (err) => {
          console.error(err);
          alert(err?.error?.message || 'Error al crear evento');
        }
      });
  }
}
