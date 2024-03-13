import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { TemporadaService } from '../_services/temporada.service';
import { EntrenamientoService } from '../_services/entrenamiento.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-entrenamiento',
  templateUrl: './admin-entrenamiento.component.html',
  styleUrls: ['./admin-entrenamiento.component.scss'],
})
export class AdminEntrenamientoComponent implements OnInit {
  suscription: Subscription = new Subscription();

  content?: string;
  currentUser: any;
  mensaje: string = '';
  error: boolean = false;

  semanaActual: number = DateTime.now().weekNumber;
  anyoActual: number = DateTime.now().year;

  temporadas: any[] = [];
  idTemporada: number = 0;

  todosEntrenamientos: any[] = [];
  entrenamientos: any[] = []; // filtrados

  formulario: boolean = false;
  panel: boolean = false;
  entrene: any;
  temporada: any;

  constructor(
    private userService: UserService,
    private tokenService: TokenStorageService,
    private router: Router,
    private temporadaService: TemporadaService,
    private entrenamientoService: EntrenamientoService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();

    if (!this.currentUser) {
      this.router.navigate(['/home']);
    } else {
      this.userService.getEntrenador().subscribe({
        next: (data) => {
          this.content = data;
        },
        error: (err) => {
          this.content = JSON.parse(err.error).message;
          this.router.navigate(['/home']);
        },
      });

      this.suscription = this.entrenamientoService.refresh$.subscribe(() => {
        this.getEntrenamientos();
      });

      this.temporadaService.getTemporadas().subscribe({
        next: (data) => {
          this.temporadas = data;
          this.getEntrenamientos();
        },
        error: (err) => {},
      });
    }
  }

  getEntrenamientos() {
    this.entrenamientoService
      .getEntrenamientosClub(this.currentUser.clubId)
      .subscribe({
        next: (data) => {
          this.todosEntrenamientos = data;
          if (this.todosEntrenamientos.length > 0) {
            this.filtrarTemporada(0);
          } else {
            this.mensaje = 'No hay entrenamientos todavia.';
            this.error = true;
          }
        },
        error: (err) => {
          this.mensaje = err.error.message;
          this.error = true;
        },
      });
  }

  filtrarTemporada(temporadaId: number) {
    let descTemp = '';
    this.entrenamientos = [];

    if (temporadaId > 0) {
      this.temporadas.forEach((temp) => {
        if (temp.id === temporadaId) descTemp = temp.description;
      });

      this.todosEntrenamientos.forEach((entrene) => {
        if (entrene.temporadaId === temporadaId) {
          this.entrenamientos.push({
            id: entrene.id,
            nombre: entrene.nombre,
            temporada: descTemp,
            tipo: entrene.tipo,
          });
        }
      });
    } else {
      this.temporadas.forEach((temp) => {
        descTemp = temp.description;
        this.todosEntrenamientos.forEach((entrene) => {
          if (entrene.temporadaId === temp.id) {
            this.entrenamientos.push({
              id: entrene.id,
              nombre: entrene.nombre,
              temporada: descTemp,
              tipo: entrene.tipo,
            });
          }
        });
      });
    }
  }

  abrirFormulario() {
    this.formulario = !this.formulario;
  }

  abrirPanel(entrene: any) {
    this.entrene = entrene;

    this.panel = !this.panel;
  }
}
