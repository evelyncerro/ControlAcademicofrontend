import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from '../../../app/core/services/auth/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
  imports: [RouterOutlet, RouterLink],
})
export class Layout {

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.cerrarSesion();
  }
}

