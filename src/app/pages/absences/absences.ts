import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-absences',
  imports: [FormsModule, DatePipe],
  templateUrl: './absences.html',
  styleUrl: './absences.css',
})
export class Absences implements OnInit {
  absences: any[] = [];
  users: any[] = [];
  absenceDefinitions: any[] = [];
  usersCount = 0;
  selectedDate = '';
  isLoading = true;

  constructor(private api: Api, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.api.getToken().subscribe({
      next: () => {
        this.api.getAbsences().subscribe({
          next: () => {
            this.absences = this.api.absences;
            this.isLoading = false;
            this.cdr.detectChanges();
          },
          error: (err) => console.error('Error fetching absences:', err)
        });
        this.api.getUsers().subscribe({
          next: () => {
            this.users = this.api.users;
            this.cdr.detectChanges();
          }
        });
        this.api.getAbsenceDefinitions().subscribe({
          next: () => {
            this.absenceDefinitions = this.api.absenceDefinitions;
            this.cdr.detectChanges();
          }
        });
      },
      error: (err) => console.error('Token failed:', err)
    })
  }

  getUserAbsences(userId: string) {
    if(!this.selectedDate) return [];
    const selected = new Date(this.selectedDate);
    return this.absences.filter(a => {
      const from = new Date(a.PartialTimeFrom);
      const to = new Date(a.PartialTimeTo);
      return a.UserId === userId && selected >= from && selected <= to;
    });
  }

  getUsersCount() {
    if(!this.selectedDate) return 0;
    const selected = new Date(this.selectedDate);
    return this.users.filter(u => this.getUserAbsences(u.Id).length > 0).length;
  }

  get filteredUsers() {
    if(!this.selectedDate) return [];
    return this.users.filter(u => this.getUserAbsences(u.Id).length > 0);
  }

  refresh() {
    window.location.reload();
  }

}
