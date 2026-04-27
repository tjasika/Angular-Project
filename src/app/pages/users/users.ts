import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  users: any[] = []
  isLoading = true;

  constructor(private api: Api,private cdr: ChangeDetectorRef) {}

  ngOnInit() {

    this.api.getToken().subscribe({
      next: () => {
        this.api.fetchData('api/v1/Users').subscribe({
          next: (data) => {
            console.log('fetch next fired', data);
            this.users = data;
            this.isLoading = false;
            this.cdr.detectChanges();
          },
          error: (err) => console.error('Request failed:', err)
        });
      },
      error: (err) => {
        console.error('Token failed:', err)
        this.isLoading = false;
      }
    });
  }

}
