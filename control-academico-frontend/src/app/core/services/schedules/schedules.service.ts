import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export interface ScheduleCrud {
  id: number;
  dia: string;
  horaInicio: string;
  horaFin: string;
  idUsuario: number;
  idAsignatura: number;
}

export interface ScheduleCreateUpdateDto {
  id: number;
  dia: string;
  horaInicio: string;
  horaFin: string;
  idUsuario: number;
  idAsignatura: number;
}

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  private baseUrl = `${environment.apiUrl}/Schedules`;

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<ScheduleCrud[]>(this.baseUrl);
  }

  crear(data: ScheduleCreateUpdateDto) {
    return this.http.post<ScheduleCrud>(this.baseUrl, data);
  }

  actualizar(data: ScheduleCreateUpdateDto) {
    return this.http.put<ScheduleCrud>(this.baseUrl, data);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
