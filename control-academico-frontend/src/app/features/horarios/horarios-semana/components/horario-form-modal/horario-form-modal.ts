import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface HorarioFormData {
  id?: number;
  dia: string;
  horaInicio: string;
  horaFin: string;
  idUsuario: number;
  idAsignatura: number;
}

interface UsuarioOption {
  id: number;
  nombre: string;
}

interface AsignaturaOption {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-horario-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './horario-form-modal.html',
  styleUrl: './horario-form-modal.css',
})
export class HorarioFormModalComponent implements OnChanges {
  @Input() visible = false;
  @Input() titulo = '';
  @Input() horario: HorarioFormData | null = null;

  @Input() usuarios: UsuarioOption[] = [];
  @Input() asignaturas: AsignaturaOption[] = [];

  @Output() save = new EventEmitter<HorarioFormData>();
  @Output() cancel = new EventEmitter<void>();

  form: HorarioFormData = {
    id: 0,
    dia: '',
    horaInicio: '',
    horaFin: '',
    idUsuario: 0,
    idAsignatura: 0,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['horario']) {
      if (this.horario) {
        this.form = {
          id: this.horario.id,
          dia: this.horario.dia,
          horaInicio: this.horario.horaInicio,
          horaFin: this.horario.horaFin,
          idUsuario: this.horario.idUsuario,
          idAsignatura: this.horario.idAsignatura,
        };
      } else {
        this.form = {
          id: 0,
          dia: '',
          horaInicio: '',
          horaFin: '',
          idUsuario: 0,
          idAsignatura: 0,
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
