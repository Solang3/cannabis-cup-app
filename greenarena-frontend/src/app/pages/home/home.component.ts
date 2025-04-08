// src/app/pages/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbButtonModule } from '@nebular/theme';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NbCardModule, NbButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
