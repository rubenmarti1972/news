import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Department } from '@shared/models/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private storageKey = 'departments';
  private departments: Department[] = this.loadDepartments();
  private departmentsSubject = new BehaviorSubject<Department[]>(this.departments);

  private loadDepartments(): Department[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveDepartments(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.departments));
  }

  getDepartments(): Observable<Department[]> {
    return this.departmentsSubject.asObservable();
  }

  addDepartment(dept: Department): void {
    // Evitamos duplicados usando el slug, por ejemplo
    if (!this.departments.find(d => d.slug === dept.slug)) {
      this.departments.push(dept);
      this.departmentsSubject.next(this.departments);
      this.saveDepartments();
    }
  }

  // Métodos para actualizar o eliminar departamentos, si los necesitas.
}





