import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { EntrenamientoService } from 'src/app/_services/entrenamiento.service';
import { UserService } from 'src/app/_services/user.service';
import { DateTime } from 'luxon';
import { Subscription } from 'rxjs';
import { SesionService } from 'src/app/_services/sesion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel-entrene',
  templateUrl: './panel-entrene.component.html',
  styleUrls: ['./panel-entrene.component.scss'],
})
export class PanelEntreneComponent implements OnInit {
  @Input() entrene: any;
  @Input() clubId: number = 0;
  @Output() atras: EventEmitter<any> = new EventEmitter();

  suscription: Subscription = new Subscription();

  usuarios: any[] = [];
  vistaElegir: boolean = false;

  fecha = new Date();
  fechaLuxon = DateTime.now();

  inicioSemana: string | null = '';
  finalSemana: string | null = '';

  semana: number = this.fechaLuxon.weekNumber;
  anyo: number = this.fechaLuxon.year;

  diasSemana: any[] = [];

  sesion = {
    id: 0,
    lunes: '',
    martes: '',
    miercoles: '',
    jueves: '',
    viernes: '',
    sabado: '',
    domingo: '',
    enlace: '',
  };

  nuevaSesion: boolean = false;

  isSuccessful: boolean = false;

  addParticipantes: boolean = false;
  modificar: boolean = true;

  constructor(
    private entrenamientoService: EntrenamientoService,
    private userService: UserService,
    private sesionService: SesionService
  ) {}

  ngOnInit() {
    this.suscription = this.userService.refresh$.subscribe(() => {
      this.getUsuarios(); 
    });

    this.nuevaFecha(new Date());

    if (this.entrene.tipo === null) {
      this.vistaElegir = true;
    }

    this.userService
      .getByEntrene(this.entrene.id, this.clubId)
      .subscribe((r) => (this.usuarios = r));
  }

  getUsuarios() {
    this.usuarios = [];
    this.userService
      .getByEntrene(this.entrene.id,this.clubId)
      .subscribe((r) => (this.usuarios = r));
  }

  enviarTipo(tipo: number) {
    this.entrenamientoService.agregarTipo(this.entrene.id, tipo).subscribe({
      next: (value) => {
        this.entrenamientoService
          .getEntrenamiento(this.entrene.id)
          .subscribe((r) => (this.entrene = r));
        this.vistaElegir = false;
      },
    });
  }

  reload() {
    window.location.reload();
  }

  nuevaFecha(event: any) {
    if (!this.modificar) {
      this.guardarSesion();
    }

    this.fechaLuxon = DateTime.fromJSDate(event);

    this.semana = this.fechaLuxon.weekNumber;
    this.anyo = this.fechaLuxon.year;

    const inicioSemana = DateTime.fromObject({
      weekNumber: this.semana,
      weekday: 1,
      weekYear: this.anyo,
    });

    // agafar sesions de ixa semana
    try {
      this.sesionService
        .getSesiones(this.semana, this.anyo, this.entrene.id)
        .subscribe({
          next: (value) => {
            if (value) {
              this.nuevaSesion = false;
              this.sesion = value;
            } else {
              this.sesion = {
                id: 0,
                lunes: '',
                martes: '',
                miercoles: '',
                jueves: '',
                viernes: '',
                sabado: '',
                domingo: '',
                enlace: '',
              };
              this.nuevaSesion = true;
            }
          },
          error: (err) => {
            this.sesion = {
              id: 0,
              lunes: '',
              martes: '',
              miercoles: '',
              jueves: '',
              viernes: '',
              sabado: '',
              domingo: '',
              enlace: '',
            };
            this.nuevaSesion = true;
          },
        });
    } catch (error) {}

    this.llenarDiasSemana();
  }

  llenarDiasSemana() {
    this.diasSemana = [];

    const inicioDeSemana = this.fechaLuxon.startOf('week');

    for (let i = 0; i <= 6; i++) {
      this.diasSemana.push(inicioDeSemana.plus({ days: i }).toLocaleString());
    }

    this.inicioSemana = inicioDeSemana.toLocaleString();
    this.finalSemana = inicioDeSemana.plus({ days: 6 }).toLocaleString();
  }

  guardarSesion() {
    const {
      id,
      lunes,
      martes,
      miercoles,
      jueves,
      viernes,
      sabado,
      domingo,
      enlace,
    } = this.sesion;

    if (this.nuevaSesion) {
      this.sesionService
        .insertarSesion(
          this.semana,
          this.anyo,
          lunes,
          martes,
          miercoles,
          jueves,
          viernes,
          sabado,
          domingo,
          enlace,
          this.entrene.id
        )
        .subscribe({
          next: (data) => {
            this.isSuccessful = true;
            this.nuevaSesion = false;
            setTimeout(() => {
              this.isSuccessful = false;
              this.modificar = true;
            }, 2000);
          },
        });
    } else {
      this.sesionService
        .update(
          id,
          lunes,
          martes,
          miercoles,
          jueves,
          viernes,
          sabado,
          domingo,
          enlace
        )
        .subscribe({
          next: (data) => {
            this.isSuccessful = true;
            setTimeout(() => {
              this.isSuccessful = false;
              this.modificar = true;
            }, 2000);
          },
        });
    }
  }

  cambiarAdd() {
    this.addParticipantes = !this.addParticipantes;
  }

  abrirAlerta() {
    Swal.fire({
      title: '¿Seguro que quieres eliminar el entrenamiento?',
      text: 'Los participantes se quedarán sin entrene.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.entrenamientoService
          .delete(this.entrene.id)
          .subscribe(() => this.atras.emit(null));
      }
    });
  }

  noModificado() {
    this.modificar = true;
    this.isSuccessful = false;
  }

  modificado() {
    this.modificar = false;
    this.isSuccessful = false;
  }
}
