import { Component } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  suscription: Subscription = new Subscription();

  private role: number = 0;
  isLoggedIn = false;
  showAdminBoard = false;
  showEntrenadorBoard = false;
  showContenidoBoard = false;
  showUserBoard = false;
  username?: string;
  user: any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true; 
    }
    
    this.getUser()

    this.suscription = this.userService.refresh$.subscribe(() => {
      this.getUser();
    });
  }

  getUser() {
    const id = this.tokenStorageService.getUser().id;

    this.userService.getUser(id).subscribe({
      next: (value) => {
        this.user = value;

        this.role = this.user.roleId;

        this.role === 1
          ? (this.showAdminBoard = true)
          : (this.showAdminBoard = false);
        this.role === 4
          ? (this.showEntrenadorBoard = true)
          : (this.showEntrenadorBoard = false);
        this.role === 3
          ? (this.showContenidoBoard = true)
          : (this.showContenidoBoard = false);
        this.role === 2
          ? (this.showUserBoard = true)
          : (this.showContenidoBoard = false);
      },
    });
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  clickMenu(enlace: string) {
    this.router.navigate([enlace]);
  }
}
