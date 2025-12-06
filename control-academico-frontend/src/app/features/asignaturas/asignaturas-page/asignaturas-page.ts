import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignaturasService, AsignaturaCrud, AsignaturaCreateUpdateDto } from '../../../core/services/asignaturas/asignaturas.service';
import { AsignaturaFormData, AsignaturaFormModalComponent } from '../asignaturas-page/components/asignatura-form-modal/asignatura-form-modal';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-asignaturas-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, AsignaturaFormModalComponent],
  templateUrl: './asignaturas-page.html',
})
export class AsignaturasPage implements OnInit {

  asignaturas: AsignaturaCrud[] = [];

  modalVisible = false;
  asignaturaEditando: AsignaturaCrud | null = null;

  constructor(private asignaturasService: AsignaturasService) {}

  ngOnInit(): void {
    this.cargarAsignaturas();
  }

  cargarAsignaturas() {
    this.asignaturasService.listar().subscribe({
      next: (data) => this.asignaturas = data,
      error: (err) => console.error('Error al cargar asignaturas', err),
    });
  }

  abrirNuevo() {
    this.asignaturaEditando = null;
    this.modalVisible = true;
  }

  editar(asignatura: AsignaturaCrud) {
    this.asignaturaEditando = asignatura;
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
  }

  onGuardarDesdeModal(data: AsignaturaFormData) {
    const dto: AsignaturaCreateUpdateDto = {
      id: data.id ?? 0,
      nombre: data.nombre,
      codigo: data.codigo,
      maxClasesSemana: data.maxClasesSemana,
    };

    if (data.id) {
      this.asignaturasService.actualizar(dto).subscribe({
        next: () => {
          this.cargarAsignaturas();
          this.cerrarModal();
        },
        error: (err) => {
          console.error('Error al actualizar asignatura', err);
        },
      });
    } else {
      this.asignaturasService.crear(dto).subscribe({
        next: () => {
          this.cargarAsignaturas();
          this.cerrarModal();
        },
        error: (err) => {
          console.error('Error al crear asignatura', err);
        },
      });
    }
  }

  confirmarEliminar(asignatura: AsignaturaCrud) {
    const ok = confirm(`¿Seguro que deseas eliminar la asignatura "${asignatura.nombre}"?`);
    if (!ok) return;

    this.asignaturasService.eliminar(asignatura.id).subscribe({
      next: () => this.cargarAsignaturas(),
      error: (err) => console.error('Error al eliminar asignatura', err),
    });
  }
}
