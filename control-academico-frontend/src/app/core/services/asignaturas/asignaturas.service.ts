import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export interface AsignaturaCrud {
  id: number;
  nombre: string;
  codigo: string;
  maxClasesSemana: number;
}

export interface AsignaturaCreateUpdateDto {
  id: number;
  nombre: string;
  codigo: string;
  maxClasesSemana: number;
}

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

  private baseUrl = `${environment.apiUrl}/Asignaturas`;

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<AsignaturaCrud[]>(this.baseUrl);
  }

  crear(data: AsignaturaCreateUpdateDto) {
    return this.http.post<AsignaturaCrud>(this.baseUrl, data);
  }

  actualizar(data: AsignaturaCreateUpdateDto) {
    return this.http.put<AsignaturaCrud>(this.baseUrl, data);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
