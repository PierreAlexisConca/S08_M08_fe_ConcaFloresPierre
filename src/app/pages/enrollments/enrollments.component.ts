import { Component } from '@angular/core';

export interface Enrollment {
  id?: number;
  name: string;
  course: string;
  date: string;
}

@Component({
  selector: 'app-enrollments',
  standalone: false,
  styleUrl: './enrollments.component.css',
  templateUrl: './enrollments.component.html'
})
export class EnrollmentsComponent {
  enrollments: Enrollment[] = [];
  enrollment: Enrollment = { name: '', course: '', date: '' };
  editMode = false;
  submitted = false;
  private nextId = 1;

  save() {
    this.submitted = true;
    if (!this.enrollment.name || !this.enrollment.course || !this.enrollment.date) return;

    if (this.editMode) {
      const idx = this.enrollments.findIndex(e => e.id === this.enrollment.id);
      if (idx !== -1) this.enrollments[idx] = { ...this.enrollment };
      this.editMode = false;
    } else {
      this.enrollments.push({ ...this.enrollment, id: this.nextId++ });
    }
    this.enrollment = { name: '', course: '', date: '' };
    this.submitted = false;
  }

  edit(e: Enrollment) {
    this.enrollment = { ...e };
    this.editMode = true;
    this.submitted = false;
  }

  delete(id: number) {
    this.enrollments = this.enrollments.filter(e => e.id !== id);
    if (this.editMode && this.enrollment.id === id) {
      this.editMode = false;
      this.enrollment = { name: '', course: '', date: '' };
    }
  }

  cancelar() {
    this.editMode = false;
    this.submitted = false;
    this.enrollment = { name: '', course: '', date: '' };
  }
}
