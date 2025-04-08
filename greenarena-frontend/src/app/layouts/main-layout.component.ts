// src/app/layouts/main-layout.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import {
  NbLayoutModule,
  NbSidebarModule,
  NbMenuModule,
  NbLayoutDirection,
  NbLayoutDirectionService,
  NbSidebarService,
} from '@nebular/theme';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {}
