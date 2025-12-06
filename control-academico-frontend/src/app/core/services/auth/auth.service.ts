import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: 'administrador' | 'estudiante';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private claveUsuario = 'usuarioActual';

  constructor(private router: Router) {}

  iniciarSesionMock(correo: string, clave: string): boolean {

    if (correo === 'admin@demo.com' && clave === 'admin123') {
      const usuario: Usuario = {
        id: 1,
        nombre: 'Administrador',
        correo,
        rol: 'administrador'
      };
      localStorage.setItem(this.claveUsuario, JSON.stringify(usuario));
      return true;
    }

    if (correo === 'estudiante@demo.com' && clave === '123456') {
      const usuario: Usuario = {
        id: 2,
        nombre: 'Estudiante',
        correo,
        rol: 'estudiante'
      };
      localStorage.setItem(this.claveUsuario, JSON.stringify(usuario));
      return true;
    }

    return false;
  }

  cerrarSesion() {
    localStorage.removeItem(this.claveUsuario);
    this.router.navigate(['/login']);
  }

  obtenerUsuario(): Usuario | null {
    const datos = localStorage.getItem(this.claveUsuario);
    return datos ? JSON.parse(datos) : null;
  }

  estaAutenticado(): boolean {
    return !!this.obtenerUsuario();
  }
}
