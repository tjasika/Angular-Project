import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  users: any[] = []
  isLoading = true;
  searchQuery = '';
  activeView: 'all' | 'add' | 'absences' = 'all';
  sortField = 'FirstName';
  sortDirection: 'asc' | 'desc' = 'asc';

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

  toggleSort(field: string) {
      if(this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  get filteredUsers() {
  return this.users
    .filter(user => 
      user.FirstName?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.LastName?.toLowerCase().includes(this.searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[this.sortField] || '';
      const valB = b[this.sortField] || '';
      return this.sortDirection === 'asc' 
        ? valA.localeCompare(valB) 
        : valB.localeCompare(valA);
    });
}

}
