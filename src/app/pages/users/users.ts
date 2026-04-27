import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  users: any[] = []

  constructor(private api: Api) {}

  ngOnInit() {
    this.api.getToken().subscribe({
      next: () => {
        this.api.fetchData('api/v1/Users').subscribe({
          next: (data) => this.users = data,
          error: (err) => console.error('Request failed:', err)
        });
      }
    });
  }

}
