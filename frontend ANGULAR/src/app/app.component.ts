import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private role: string = '';
  isLoggedIn = false;
  showAdminBoard = false;
  showEntrenadorBoard = false;
  showContenidoBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.role = user.role;

      (this.role === 'ROLE_ADMIN') ? this.showAdminBoard = true : this.showAdminBoard = false;
      (this.role === 'ROLE_ENTRENADOR') ? this.showEntrenadorBoard = true : this.showEntrenadorBoard = false;
      (this.role === 'ROLE_CONTENIDO') ? this.showContenidoBoard = true : this.showContenidoBoard = false;
      

      this.username = user.username;
    } 
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
