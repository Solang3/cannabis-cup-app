import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;
  roles = ['competitor', 'judge', 'admin'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['competitor', Validators.required],
      firstName: [''],
      lastName: [''],
      club: [''],
      photoUrl: [''],
      bio: ['']
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.http.post<any>('http://localhost:5050/api/auth/register', this.form.value)
      .subscribe({
        next: () => {
          // auto-login after registration
          this.http.post<any>('http://localhost:5050/api/auth/login', {
            username: this.form.value.username,
            password: this.form.value.password
          }).subscribe({
            next: (res) => {
              localStorage.setItem('token', res.token);
              window.dispatchEvent(new Event('token-update')); // ✅ esto actualiza señales
              alert('Login successful!');
              this.router.navigate(['/']);
            },
            error: () => alert('Registered but failed to login')
          });
        },
        error: (err) => {
          console.error(err);
          alert(err?.error?.message || 'Registration failed');
        }
      });
  }
}
