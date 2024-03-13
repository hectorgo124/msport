import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { CategoriaService } from '../_services/categoria.service';
import { DateTime } from 'luxon';
import { EntrenamientoService } from '../_services/entrenamiento.service';
import { SesionService } from '../_services/sesion.service';
import { ClubService } from '../_services/club.service';
import { NotificacionService } from '../_services/notificacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLogged: boolean = false;
  currentUser: any;
  usuario: any;
  categoria: string = '';
  fechaLuxon = DateTime.now();
  stringFecha = DateTime.now().toLocaleString();
  sesion: string = '';
  entrene: any;
  club: any;
  enlace: string = '';
  notificaciones: any;

  constructor(
    private userService: UserService,
    private tokenService: TokenStorageService,
    private router: Router,
    private categoriaService: CategoriaService,
    private entreneService: EntrenamientoService,
    private sesionService: SesionService,
    private clubService: ClubService,
    private notificacionService : NotificacionService
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;

      this.currentUser = this.tokenService.getUser();

      this.actualizarUsuario();

      this.clubService
        .getClub(this.currentUser.clubId)
        .subscribe((r) => (this.club = r));

      this.getNotificaciones();

    } 
  }

  getNotificaciones() {
    this.notificacionService.getActuales(this.currentUser.clubId).subscribe({next : value => {
     this.notificaciones = value;

     this.cambiarFormatoFechas();
    }});
  }

  cambiarFormatoFechas(){

    this.notificaciones.forEach((noti: { fechaInicio: any; }) => {
      noti.fechaInicio = DateTime.fromISO(noti.fechaInicio).toLocaleString();
    });
  }

  actualizarUsuario() {
    this.userService.getUser(this.currentUser.id).subscribe({
      next: (value) => {
        this.usuario = value;
        this.categoriaService
          .getCategoria(this.usuario.categoriaId)
          .subscribe((r) => (this.categoria = r.name));
        if (this.usuario.entrenamientoId) this.getEntrene();
      },
    });
  }

  getEntrene() {
    this.entreneService
      .getEntrenamiento(this.usuario.entrenamientoId)
      .subscribe({
        next: (value) => {
          this.entrene = value;
          this.getSesionHoy();
        },
      });
  }

  getSesionHoy() {
    this.sesionService
      .getSesiones(
        this.fechaLuxon.weekNumber,
        this.fechaLuxon.year,
        this.entrene.id
      )
      .subscribe({
        next: (value) => {
          switch (this.fechaLuxon.weekday) {
            case 1:
              this.sesion = value.lunes;
              break;
            case 2:
              this.sesion = value.martes;
              break;
            case 3:
              this.sesion = value.miercoles;
              break;
            case 4:
              this.sesion = value.jueves;
              break;
            case 5:
              this.sesion = value.viernes;
              break;
            case 6:
              this.sesion = value.sabado;
              break;
            default:
              this.sesion = value.domingo;
              break;
          }

          this.enlace = value.enlace;
        },
      });
  }

  abrirEntrenamiento() {
    this.router.navigate(['entrenamiento']);
  }
}
