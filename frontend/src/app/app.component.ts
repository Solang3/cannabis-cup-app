// src/app/app.component.ts
import { Component, signal, computed } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  token = signal<string | null>(localStorage.getItem('token') ?? null);

  constructor() {
    // ✅ Listen to token updates from anywhere
    window.addEventListener('token-update', () => {
      this.token.set(localStorage.getItem('token'));
    });
  }

  private getTokenPayload(): any | null {
    try {
      const t = this.token();
      if (!t) return null;
      return JSON.parse(atob(t.split('.')[1]));
    } catch {
      return null;
    }
  }

  username = computed(() => this.getTokenPayload()?.username ?? null);
  role = computed(() => this.getTokenPayload()?.role ?? null);
  isLoggedIn = computed(() => !!this.username());
  isAdmin = computed(() => this.role() === 'admin');
  isSponsor = computed(() => this.role() === 'sponsor');

  showMenu = false;

  loginWithGoogle(): void {
    window.location.href = 'http://localhost:5050/api/auth/google';
  }  

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.token.set(null);
    this.showMenu = false;
  }

  get displayName(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.displayName || payload.username || null;
    } catch {
      return null;
    }
  }
  
}
