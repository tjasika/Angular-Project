import { Component, OnInit } from '@angular/core';
import { Api } from './services/api';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  constructor(private api: Api) {}

  ngOnInit() {
    this.api.getToken().subscribe({
      next: () => {
        this.api.fetchData('api/v1/Users').subscribe({
          next: (data) => console.log('Data received!', data),
          error: (err) => console.error('Request failed:', err)
        });
      },
      error: (err) => console.error('Auth failed:', err)
    });
  }
}