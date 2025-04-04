// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EventLandingComponent } from './pages/event-landing/event-landing.component';
import { PublicScoresComponent } from './pages/public-scores/public-scores.component';
import { JudgeDashboardComponent } from './pages/judge-dashboard/judge-dashboard.component';
import { CompetitorDashboardComponent } from './pages/competitor-dashboard/competitor-dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { FlowerEntryComponent } from './pages/flower-entry/flower-entry.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { MeRedirectComponent } from './pages/me-redirect/me-redirect.component';
import { SponsorDashboardComponent } from './pages/sponsor-dashboard/sponsor-dashboard.component';
import { AuthCallbackComponent } from './pages/auth-callback/auth-callback.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth-callback', component: AuthCallbackComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'events/:slug', component: EventLandingComponent },
  { path: 'events/:slug/scores', component: PublicScoresComponent },
  { path: 'judge-dashboard', component: JudgeDashboardComponent },
  { path: 'competitor-dashboard', component: CompetitorDashboardComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'u/:username', component: UserProfileComponent },
  { path: '**', redirectTo: '' },
  { path: 'events/:slug/enter', component: FlowerEntryComponent },
  { path: 'me', component: MeRedirectComponent },
  { path: 'sponsor-dashboard', component: SponsorDashboardComponent }
];
