import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'https://api4.allhours.com';
  private accessToken = '';
  private tokenUrl = environment.tokenUrl;
  private clientId = environment.clientId;
  private clientSecret = environment.clientSecret;


  constructor(private http: HttpClient) {}

  getToken() {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);
    body.set('scope', 'api');

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post<any>(this.tokenUrl, body.toString(), { headers }).pipe(
      tap(response => this.accessToken = response.access_token)
    );
  }

  fetchData(endpoint: string) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.accessToken}` });
    return this.http.get<any>(`${this.baseUrl}/${endpoint}`, { headers });
  }
}