import { Component, signal } from '@angular/core';
//import { Component, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '@shared/models/category.model';
import { Department } from '@shared/models/department.model';
import { CategoryService } from '@shared/services/category.service';
import { DepartmentService } from '@shared/services/department.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carga-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carga-categorias.html',
})
export class CargaCategoriasComponent {

  /* ngOnInit(){
   localStorage.clear();
   } */
  categoryName = signal<string>('');
  categoryIcon = signal<string>('');
  depts = signal<Department[]>([]);
  selectedDepartmentId = signal<number | null>(null);

  constructor(
    private categoryService: CategoryService,
    private departmentService: DepartmentService
  ) {
    this.departmentService.getDepartments().subscribe((departments) => {
      this.depts.set(departments);
      console.log('Departamentos disponibles:', departments);
    });
  }


  get selectedDept(): number | null {
    return this.selectedDepartmentId();
  }
  set selectedDept(value: number | null) {
    this.selectedDepartmentId.set(value);
  }

  addCategory(): void {
    const name = this.categoryName().trim();
    if (!name) return;
    if (this.selectedDepartmentId() === null) {
      alert('Por favor, seleccione un departamento.');
      return;
    }
    const slug = name.toLowerCase().trim().replace(/\s+/g, '-');
    const newCategory: Category = {
      id: 0,
      name: name,
      image: '',
      slug: slug,
      departmentId: this.selectedDepartmentId() as number,
      icon: this.categoryIcon().trim()
    };
    console.log('➡️ Nueva categoría a enviar:', newCategory);
    this.categoryService.addCategory(newCategory);
    this.categoryName.set('');
    this.categoryIcon.set('');
    this.selectedDepartmentId.set(null);
  }
}
