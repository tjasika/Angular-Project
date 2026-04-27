import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class Api {
  private accessToken = '';
  private tokenReady = false;
 
  constructor(private http: HttpClient) {}

  getToken() {    const clientId = localStorage.getItem('clientId') || '';
    const clientSecret = localStorage.getItem('clientSecret') || '';
    const tokenUrl = localStorage.getItem('tokenUrl') || '';
    const baseUrl = localStorage.getItem('baseUrl') || '';

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', clientId);
    body.set('client_secret', clientSecret);
    body.set('scope', 'api');

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post<any>(tokenUrl, body.toString(), { headers }).pipe(
      tap(response => {
        this.accessToken = response.access_token;
        this.tokenReady = true;
      })
    );
  }

  fetchData(endpoint: string) {
    const baseUrl = localStorage.getItem('baseUrl') || '';
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${this.accessToken}` 
    });
    return this.http.get<any>(`${baseUrl}/${endpoint}`, { headers });
  }
}