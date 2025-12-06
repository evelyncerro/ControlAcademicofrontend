import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Layout } from './layout/layout/layout';

import { UsuariosPage } from './features/usuarios/usuarios-page/usuarios-page';
import { AsignaturasPage } from './features/asignaturas/asignaturas-page/asignaturas-page';
import { HorariosPage } from './features/horarios/horarios-page/horarios-page';
import { HorariosSemana } from './features/horarios/horarios-semana/horarios-semana';

import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },


  { path: 'login', component: Login },


  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: 'inicio', component: HorariosPage },
      { path: 'usuarios', component: UsuariosPage },
      { path: 'asignaturas', component: AsignaturasPage },
      { path: 'horarios', component: HorariosSemana },

    ],
  },


  { path: '**', redirectTo: 'login' },

  { path: '**', redirectTo: '' },
];
