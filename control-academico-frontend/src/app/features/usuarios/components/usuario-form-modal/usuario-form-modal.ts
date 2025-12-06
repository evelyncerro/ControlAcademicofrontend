import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export type RolUsuario = 'administrador' | 'docente' | 'estudiante';

export interface UsuarioFormData {
  id: number;
  nombre: string;
  correo: string;
  rol: RolUsuario | '';
}

@Component({
  selector: 'app-usuario-form-modal',
  standalone: true,
  templateUrl: './usuario-form-modal.html',
  styleUrls: ['./usuario-form-modal.css'],
  imports: [FormsModule],
})
export class UsuarioFormModalComponent {
  @Input() visible = false;
  @Input() titulo = 'Nuevo usuario';
  @Input() usuario: UsuarioFormData | null = null;

  @Output() save = new EventEmitter<UsuarioFormData>();
  @Output() cancel = new EventEmitter<void>();

  form: UsuarioFormData = {
    id: 0,
    nombre: '',
    correo: '',
    rol: '',
  };

  ngOnChanges() {
    if (this.usuario) {
      this.form = { ...this.usuario };
    } else {
      this.form = {
        id: 0,
        nombre: '',
        correo: '',
        rol: '',
      };
    }
  }

  onCancelar() {
    this.cancel.emit();
  }

  onGuardar() {
    if (!this.form.nombre.trim() || !this.form.correo.trim() || !this.form.rol) {
      return;
    }

    this.save.emit({
      id: this.form.id ?? null,
      nombre: this.form.nombre.trim(),
      correo: this.form.correo.trim(),
      rol: this.form.rol as RolUsuario,
    });
  }
}
