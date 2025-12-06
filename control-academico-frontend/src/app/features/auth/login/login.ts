import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule,
    IconFieldModule,
    InputIconModule,],
})
export class Login {
  correo = '';
  clave = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  iniciarSesion() {
    this.error = '';

    const correcto = this.auth.iniciarSesionMock(this.correo, this.clave);

    if (correcto) {
      this.router.navigate(['/inicio']);
    } else {
      this.error = 'Credenciales incorrectas';
    }
  }
}
