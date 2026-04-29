import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-users',
  imports: [FormsModule, DatePipe],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  users: any[] = [];
  absences: any[] = [];
  absenceDefinitions: any[] = [];
  isLoading = true;
  searchQuery = '';
  sortField = 'FirstName';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private api: Api,private cdr: ChangeDetectorRef) {}

  //fetch data
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
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Absences failed:', err)
      });

      this.api.fetchData('api/v1/AbsenceDefinitions').subscribe({
        next: (data) => {
          this.absenceDefinitions = data;
          console.log(this.absenceDefinitions);
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error fetching absence definitions:', err)
      })
    },

      error: (err) => {
        console.error('Token failed:', err)
        this.isLoading = false;
      }
    });

  }

  //add new user
  newUser = {
    FirstName : '',
    LastName : '',
    Email : '',
    BirthDate : ''
  }

  addUser() {
    this.api.postData('api/v1/Users', this.newUser).subscribe({
      next: (data) => {
        console.log('User added successfully!', data);
        this.closeAddUser();
      },
      error: (err) => console.error('Error addind user:', err)
    });
  }

  //add absence modal
  showAddAbsence = false;
  selectedUserId = '';

  openAddAbsence(userId: string) {
    this.selectedUserId = userId;
    this.selectedUser = this.users.find(u => u.Id === userId);
    this.newAbsence.UserId = userId;
    this.showAddAbsence = true;
  }
  closeAddAbsence() {
    this.showAddAbsence = false;
  }

  //add new absence
  newAbsence = {
    UserId: '',
    AbsenceDefinitionId: '',
    PartialTimeFrom: '',
    PartialTimeTo: '',
    IsPartial: false
  }

  addAbsence() {
    this.api.postData('api/v1/Absences', this.newAbsence).subscribe({
      next: (data) => {
        console.log('Absence added!', data);
        this.closeAddAbsence();
        this.cdr.detectChanges();
        alert('Absence added successfully!');
      },
      error: (err) => console.error('Add absence failed:', err)
    });
  }


  //get absences by user
  getUserAbsences(userId: string) {
    return this.absences.filter(a => a.UserId === userId);
  }

  //sort users alphabetically
  toggleSort(field: string) {
      if(this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  //filter users by name
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

  //manage absences view
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

  //absence details modal
  selectedAbsence: any = null;

  openAbsence(absence: any) {
    this.selectedAbsence = absence;
  }

  closeAbsence() {
    this.selectedAbsence = null;
  }

  //add user modal
  showAddUser = false;
  openAddUser() {
    this.showAddUser = true;
  }
  closeAddUser() {
    this.showAddUser = false;
  }

  //user details modal
  showUserDetails = false;
  selectedUser: any = null;

  openUserDetails(user: any) {
    this.selectedUser = user;
    this.showUserDetails = true;
  }

  closeUserDetails() {
    this.showUserDetails = false;
  }

  //refresh
  refresh() {
    window.location.reload();
  }


}
