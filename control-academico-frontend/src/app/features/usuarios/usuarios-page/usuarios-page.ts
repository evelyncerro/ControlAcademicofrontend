import { Component, OnInit } from '@angular/core';
import { UsuariosService, UsuarioCrud, RolUsuario } from '../../../core/services/usuarios/usuarios.services';
import { UsuarioFormModalComponent, UsuarioFormData } from '../components/usuario-form-modal/usuario-form-modal';

import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-usuarios-page',
  standalone: true,
  templateUrl: './usuarios-page.html',
  styleUrls: ['./usuarios-page.css'],
  imports: [
    FormsModule,
    TableModule,
    UsuarioFormModalComponent,
    ButtonModule,
  ],
})
export class UsuariosPage implements OnInit {
  usuarios: UsuarioCrud[] = [];

  modalVisible = false;
  usuarioEditando: UsuarioFormData | null = null;

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuariosService.listar().subscribe({
      next: (res) => {
        this.usuarios = res;
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
      },
    });
  }

  abrirNuevo() {
    this.usuarioEditando = null;
    this.modalVisible = true;
  }

  editar(usuario: UsuarioCrud) {
    this.usuarioEditando = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
    };
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
    this.usuarioEditando = null;
  }

  onGuardarDesdeModal(data: UsuarioFormData) {

    console.log(data);
    const usuario = {
      id: data.id,
      nombre: data.nombre,
      correo: data.correo,
      rol: data.rol as RolUsuario,
    };

    if (data.id != 0) {
      this.usuariosService.actualizar(usuario).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.cerrarModal();
        },
        error: (err) => {
          console.error('Error al actualizar usuario', err);
        },
      });
      return;
    }else{
      this.usuariosService.crear(usuario).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.cerrarModal();
        },
        error: (err) => {
          console.error('Error al actualizar usuario', err);
        },
      });
      return;
    }
  }

  confirmarEliminar(usuario: UsuarioCrud) {
    const ok = confirm(`¿Eliminar al usuario "${usuario.nombre}"?`);
    if (!ok) return;

    this.usuariosService.eliminar(usuario.id).subscribe({
      next: () => {
        this.cargarUsuarios();
      },
      error: (err) => {
        console.error('Error al eliminar usuario', err);
      },
    });
  }


}
