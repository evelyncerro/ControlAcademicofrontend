import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { SchedulesService, ScheduleCrud } from '../../../core/services/schedules/schedules.service';
import { UsuariosService, UsuarioCrud } from '../../../core/services/usuarios/usuarios.services';
import { AsignaturasService, AsignaturaCrud } from '../../../core/services/asignaturas/asignaturas.service';

interface EventoSemana {
  id: number;
  titulo: string;
  dia: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes';
  hora: string;
  aula?: string;
}

@Component({
  selector: 'app-horarios-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horarios-page.html',
  styleUrls: ['./horarios-page.css'],
})
export class HorariosPage implements OnInit {

  dias: Array<EventoSemana['dia']> = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'
  ];

  horas: string[] = [
    '07:00', '08:00', '09:00', '10:00',
    '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00'
  ];

  // 🔹 Esto ahora viene del backend (ya no está quemado)
  eventos: EventoSemana[] = [];

  usuarios: UsuarioCrud[] = [];
  asignaturas: AsignaturaCrud[] = [];

  constructor(
    private schedulesService: SchedulesService,
    private usuariosService: UsuariosService,
    private asignaturasService: AsignaturasService,
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarAsignaturas();
  }

  cargarUsuarios() {
    this.usuariosService.listarConEliminados().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error('Error usuarios', err),
    });
  }

  cargarAsignaturas() {
    this.asignaturasService.listar().subscribe({
      next: (data) => {
        this.asignaturas = data;
        this.cargarHorarios(); // solo cuando ya tengo asignaturas
      },
      error: (err) => console.error('Error asignaturas', err),
    });
  }

  cargarHorarios() {
    this.schedulesService.listar().subscribe({
      next: (data) => this.mapearEventos(data),
      error: (err) => console.error('Error horarios', err),
    });
  }

  private mapearEventos(data: ScheduleCrud[]) {
  this.eventos = data.map(h => {
    const horaSlot = h.horaInicio.substring(0, 2) + ':00';

    return {
      id: h.id,
      titulo: `${this.getAsignaturaNombre(h.idAsignatura)} - ${this.getUsuarioNombre(h.idUsuario)}`,
      dia: h.dia as EventoSemana['dia'],
      hora: horaSlot,
    };
  });
}


  getEventos(dia: EventoSemana['dia'], hora: string): EventoSemana[] {
    return this.eventos.filter(e => e.dia === dia && e.hora === hora);
  }

  getUsuarioNombre(id: number): string {
    const u = this.usuarios.find(x => x.id === id);
    return u ? u.nombre : `Usuario #${id}`;
  }

  getAsignaturaNombre(id: number): string {
    const a = this.asignaturas.find(x => x.id === id);
    return a ? a.nombre : `Asignatura #${id}`;
  }
}
