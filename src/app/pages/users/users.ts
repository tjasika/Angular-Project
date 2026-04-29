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
  users: any[] = [];
  absences: any[] = [];
  isLoading = true;
  searchQuery = '';
  sortField = 'FirstName';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private api: Api,private cdr: ChangeDetectorRef) {}

  ngOnInit() {

    this.api.getToken().subscribe({
      next: () => {
        this.api.fetchData('api/v1/Users').subscribe({
        next: (data) => {
          this.users = data;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Users failed:', err)
      });

      this.api.fetchData('api/v1/Absences').subscribe({
        next: (data) => {
          this.absences = data;
          console.log(this.absences);
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Absences failed:', err)
      });
    },
      error: (err) => {
        console.error('Token failed:', err)
        this.isLoading = false;
      }
      
    });

  }

  getUserAbsences(userId: string) {
    return this.absences.filter(a => a.UserId === userId);
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

  expandedUsers = new Set<string>();

  toggleExpand(userId: string) {
    if(this.expandedUsers.has(userId)) {
      this.expandedUsers.delete(userId);
    } else {
      this.expandedUsers.add(userId);
    }
  }

  isExpanded(userId: string) {
    return this.expandedUsers.has(userId);
  }

  getVisibleAbsences(userId: string) {
    const absences = this.getUserAbsences(userId);
    return this.isExpanded(userId) ? absences : absences.slice(0, 4);
  }

}
