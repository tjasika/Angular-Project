import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'

@Component({
  selector: 'app-settings',
  imports: [FormsModule, RouterLink],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  clientId = '';
  clientSecret = '';
  tokenUrl = 'https://login.spica.com/connect/token';
  baseUrl = 'https://api4.allhours.com/';

  constructor(private router: Router) {}


  ngOnInit() {
    this.clientId = localStorage.getItem('clientId') || '';
    this.clientSecret = localStorage.getItem('clientSecret') || '';
  }

  saveSettings() {
    localStorage.setItem('clientId', this.clientId);
    localStorage.setItem('clientSecret', this.clientSecret);
    localStorage.setItem('tokenUrl', this.tokenUrl);
    localStorage.setItem('baseUrl', this.baseUrl);
    alert('Settings saved!');
    this.router.navigate(['/users']);  
  }
}
