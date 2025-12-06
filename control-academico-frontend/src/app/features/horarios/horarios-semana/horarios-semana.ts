import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { UsuariosService, UsuarioCrud } from '../../../core/services/usuarios/usuarios.services';
import { AsignaturasService, AsignaturaCrud } from '../../../core/services/asignaturas/asignaturas.service';
import { SchedulesService, ScheduleCrud, ScheduleCreateUpdateDto } from '../../../core/services/schedules/schedules.service';

import { HorarioFormModalComponent, HorarioFormData } from '../horarios-semana/components/horario-form-modal/horario-form-modal';

@Component({
  selector: 'app-horarios-semana',
  standalone: true,
  imports: [CommonModule, ButtonModule, HorarioFormModalComponent],
  templateUrl: './horarios-semana.html',
  styleUrl: './horarios-semana.css',
})
export class HorariosSemana implements OnInit {

  horarios: ScheduleCrud[] = [];
  usuarios: UsuarioCrud[] = [];
  asignaturas: AsignaturaCrud[] = [];

  modalVisible = false;
  horarioEditando: HorarioFormData | null = null;

  constructor(
    private usuariosService: UsuariosService,
    private asignaturasService: AsignaturasService,
    private schedulesService: SchedulesService,
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarAsignaturas();
    this.cargarHorarios();
  }

  cargarUsuarios() {
    this.usuariosService.listarConEliminados().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error('Error al cargar usuarios', err),
    });
  }

  cargarAsignaturas() {
    this.asignaturasService.listar().subscribe({
      next: (data) => this.asignaturas = data,
      error: (err) => console.error('Error al cargar asignaturas', err),
    });
  }

  cargarHorarios() {
    this.schedulesService.listar().subscribe({
      next: (data) => this.horarios = data,
      error: (err) => console.error('Error al cargar horarios', err),
    });
  }

  abrirNuevo() {
    this.horarioEditando = null;
    this.modalVisible = true;
  }

  editar(h: ScheduleCrud) {
    this.horarioEditando = {
      id: h.id,
      dia: h.dia,
      horaInicio: h.horaInicio,
      horaFin: h.horaFin,
      idUsuario: h.idUsuario,
      idAsignatura: h.idAsignatura,
    };
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
  }

  onGuardarDesdeModal(data: HorarioFormData) {
    const dto: ScheduleCreateUpdateDto = {
      id: data.id ?? 0,
      dia: data.dia,
      horaInicio: data.horaInicio,
      horaFin: data.horaFin,
      idUsuario: data.idUsuario,
      idAsignatura: data.idAsignatura,
    };

    if (data.id) {
      this.schedulesService.actualizar(dto).subscribe({
        next: () => {
          this.cargarHorarios();
          this.cerrarModal();
        },
        error: (err) => console.error('Error al actualizar horario', err),
      });
    } else {
      this.schedulesService.crear(dto).subscribe({
        next: () => {
          this.cargarHorarios();
          this.cerrarModal();
        },
        error: (err) => console.error('Error al crear horario', err),
      });
    }
  }

  confirmarEliminar(h: ScheduleCrud) {
    const ok = confirm(`¿Seguro que deseas eliminar el horario de ${this.getAsignaturaNombre(h.idAsignatura)} - ${h.dia}?`);
    if (!ok) return;

    this.schedulesService.eliminar(h.id).subscribe({
      next: () => this.cargarHorarios(),
      error: (err) => console.error('Error al eliminar horario', err),
    });
  }

  getUsuarioNombre(idUsuario: number): string {
    const u = this.usuarios.find(x => x.id === idUsuario);
    return u ? u.nombre : `#${idUsuario}`;
  }

  getAsignaturaNombre(idAsignatura: number): string {
    const a = this.asignaturas.find(x => x.id === idAsignatura);
    return a ? a.nombre : `#${idAsignatura}`;
  }
}
