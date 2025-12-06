import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AsignaturaFormData {
  id?: number;
  nombre: string;
  codigo: string;
  maxClasesSemana: number;
}

@Component({
  selector: 'app-asignatura-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asignatura-form-modal.html',
  styleUrl: './asignatura-form-modal.css',
})
export class AsignaturaFormModalComponent implements OnChanges {

  @Input() visible = false;
  @Input() titulo = '';
  @Input() asignatura: AsignaturaFormData | null = null;

  @Output() save = new EventEmitter<AsignaturaFormData>();
  @Output() cancel = new EventEmitter<void>();

  form: AsignaturaFormData = {
    id: 0,
    nombre: '',
    codigo: '',
    maxClasesSemana: 1,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['asignatura']) {
      if (this.asignatura) {
        this.form = {
          id: this.asignatura.id,
          nombre: this.asignatura.nombre,
          codigo: this.asignatura.codigo,
          maxClasesSemana: this.asignatura.maxClasesSemana,
        };
      } else {
        this.form = {
          id: 0,
          nombre: '',
          codigo: '',
          maxClasesSemana: 1,
        };
      }
    }
  }

  onGuardar() {
    this.save.emit(this.form);
  }

  onCancelar() {
    this.cancel.emit();
  }
}
