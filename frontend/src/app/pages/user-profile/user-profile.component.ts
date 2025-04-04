import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  username = '';
  user: any;
  entries: any[] = [];
  loading = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
    this.http.get<any>(`http://localhost:5050/api/users/${this.username}/public-profile`)
      .subscribe({
        next: (res) => {
          this.user = res.user;
          this.entries = res.entries;
          this.loading = false;
        },
        error: () => this.loading = false
      });
  }
}
