import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { ClubService } from '../_services/club.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss'],
})
export class AdministradorComponent implements OnInit {
  suscription: Subscription = new Subscription();
  authSus: Subscription = new Subscription();

  currentUser: any;

  users: any[] = [];

  club: string = '';

  mostrarForm = false;
  mostrarEditar = false;

  user: any;

  mostrarNoti: boolean = false;
  
  constructor(
    private tokenService: TokenStorageService,
    private router: Router,
    private userService: UserService,
    private clubService: ClubService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();

    this.userService.getAdmin().subscribe({
      next: (data) => {},
      error: (err) => {
        this.router.navigate(['/home']);
      },
    });

    this.suscription = this.userService.refresh$.subscribe(() => {
      this.getUsers();
    });

    this.authSus = this.authService.refresh$.subscribe(() => {
      this.getUsers();
    })

    this.getUsers();

    this.clubService
      .getClub(this.currentUser.clubId)
      .subscribe((r) => (this.club = r.nombre));
  }

  getUsers() {
    this.userService
      .getUsers(this.currentUser.clubId)
      .subscribe((r) => (this.users = r));
  }

  cambiarForm() {
    this.mostrarForm = !this.mostrarForm;
    this.user = null;
  }

  editarUsuario(user: any) {
    if (this.user !== user) {
      this.user = user;

      this.mostrarForm = true;
    } else {
      this.mostrarForm = false;
    }
  }

  panelNoti() {
    this.mostrarNoti = !this.mostrarNoti;
  }
}
