import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Department } from '@shared/models/department.model';
import { DepartmentService } from '@shared/services/department.service';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './department.component.html',
  // Puedes habilitar ChangeDetectionStrategy.OnPush si lo deseas
})
export class DepartmentComponent {
  // Signal para almacenar el nombre ingresado
  departmentName = signal<string>('');

  constructor(private departmentService: DepartmentService) {}

  addDepartment(): void {
    const name = this.departmentName().trim();
    if (!name) return;

    // Genera un slug a partir del nombre (ej: "Ropa de Hombre" -> "ropa-de-hombre")
    const slug = name.toLowerCase().trim().replace(/\s+/g, '-');

    const newDepartment: Department = {
      id: 0,          // El ID puede generarse en el servicio si se requiere
      name: name,
      image: '',      // Si dispones de imagen, puedes agregarla
      slug: slug,
    };

    // Agrega el departamento al servicio
    this.departmentService.addDepartment(newDepartment);

    // Reinicia el input
    this.departmentName.set('');
  }
}

