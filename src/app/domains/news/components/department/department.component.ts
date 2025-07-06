import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Department } from '@shared/models/department.model';
import { DepartmentService } from '@shared/services/department.service';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './department.component.html',
})
export class DepartmentComponent {
  departmentName = signal<string>('');

  constructor(private departmentService: DepartmentService) {}

  addDepartment(): void {
    const name = this.departmentName().trim();
    if (!name) return;
    const slug = name.toLowerCase().trim().replace(/\s+/g, '-');
    const newDepartment: Department = {
      id: 0,
      name: name,
      image: '',
      slug: slug,
    };
    this.departmentService.addDepartment(newDepartment);
    this.departmentName.set('');
  }
}

