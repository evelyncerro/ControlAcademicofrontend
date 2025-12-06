import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export type RolUsuario = 'administrador' | 'estudiante' | 'docente';

export interface UsuarioCrud {
  id: number;
  nombre: string;
  correo: string;
  rol: RolUsuario;
}

export interface UsuarioCreateUpdateDto {
  id: number;
  nombre: string;
  correo: string;
  rol: RolUsuario;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseUrl = `${environment.apiUrl}/Usuarios`;

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<UsuarioCrud[]>(this.baseUrl);
  }

  crear(data: UsuarioCreateUpdateDto) {
    return this.http.post<UsuarioCrud>(this.baseUrl, data);
  }

  actualizar(data: UsuarioCreateUpdateDto) {
    return this.http.put<UsuarioCrud>(`${this.baseUrl}`, data);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  listarConEliminados() {
    return this.http.get<UsuarioCrud[]>(`${this.baseUrl}/all`);
  }
  
}
