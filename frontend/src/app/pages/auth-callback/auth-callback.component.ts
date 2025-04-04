// src/app/pages/auth-callback/auth-callback.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-auth-callback',
  template: `<p>Redirigiendo...</p>`
})
export class AuthCallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        localStorage.setItem('token', token);
        window.dispatchEvent(new Event('token-update'));
        this.router.navigate(['/']); // o a /me
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
