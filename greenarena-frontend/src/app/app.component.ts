// src/app/app.component.ts
import { Component } from '@angular/core';
import { NbLayoutModule, NbSidebarModule, NbButtonModule } from '@nebular/theme';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NbLayoutModule, NbSidebarModule, NbButtonModule],
  template: `
    <nb-layout>
      <nb-layout-header fixed>🌿 GreenArena</nb-layout-header>

      <nb-sidebar>Sidebar con navegación</nb-sidebar>

      <nb-layout-column>
        <router-outlet></router-outlet>
      </nb-layout-column>
    </nb-layout>
  `
})
export class AppComponent {}
