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
  isLoading = true;

  constructor(private api: Api, private cdr: ChangeDetectorRef) {}

  currentDate = new Date();

  get selectedDate() {
    return this.currentDate.toISOString().split('T')[0];
  }

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

  //date methods
  previousDay() {
    const d = new Date(this.currentDate);
    d.setDate(d.getDate() - 1);
    this.currentDate = d;
  }

  nextDay() {
    const d = new Date(this.currentDate);
    d.setDate(d.getDate() - 1);
  }

  getDateRow() {
    return Array.from({length: 7}, (_, i) => {
      const d = new Date(this.currentDate);
      d.setDate(d.getDate() - 3 + i);
      return d;
    });
  }

  isToday(date: Date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isSelected(date: Date) {
    return date.toDateString() === this.currentDate.toDateString();
  }

  selectDate(date: Date) {
    this.currentDate = date;
  }

  toDate(dateString: string) {
    return new Date(dateString);
  }

}
