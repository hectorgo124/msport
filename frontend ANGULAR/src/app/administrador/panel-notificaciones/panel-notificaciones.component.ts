import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotificacionService } from 'src/app/_services/notificacion.service';
import { DateTime } from 'luxon';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel-notificaciones',
  templateUrl: './panel-notificaciones.component.html',
  styleUrls: ['./panel-notificaciones.component.scss'],
})
export class PanelNotificacionesComponent implements OnInit {
  suscription: Subscription = new Subscription();

  @Input() clubId: number = 0;
  @Output() atras: EventEmitter<any> = new EventEmitter();

  verFormulario: boolean = false;
  notificaciones: any;
  fechaLuxon = DateTime.now();

  id: number = 0;

  constructor(private notificacionService: NotificacionService) {}

  ngOnInit(): void {
    this.suscription = this.notificacionService.refresh$.subscribe(() => {
      this.getNotificaciones();
    });

    this.getNotificaciones();
  }

  getNotificaciones() {
    this.notificacionService.getNotificacionesClub(this.clubId).subscribe({
      next: (value) => {
        this.notificaciones = value;
        this.cambiarFormatoFechas();
      },
    });
  }

  cambiarFormatoFechas() {
    this.notificaciones.forEach((noti: { fechaInicio: any; fechaFin: any }) => {
      noti.fechaInicio = DateTime.fromISO(noti.fechaInicio).toLocaleString();
      noti.fechaFin = DateTime.fromISO(noti.fechaFin).toLocaleString();
    });
  }

  abrirEditar(id: number) {
    this.id = id;
    this.verFormulario = !this.verFormulario;
  }

  eliminar(id: number){
    Swal.fire({
      title: '¿Seguro que quieres eliminar esta notificación?',
      text: 'Dejará de ser visible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.notificacionService.delete(id).subscribe();
      }
    });
  }
}
