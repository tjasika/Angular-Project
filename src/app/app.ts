import { Component, OnInit } from '@angular/core';
import { Api } from './services/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  constructor(private api: Api) {}

  ngOnInit() {
    this.api.getToken().subscribe({
      next: (response) => console.log('Token received!', response),
      error: (err) => console.error('Auth failed:', err)
    });
  }
}