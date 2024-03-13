import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NotificacionService } from 'src/app/_services/notificacion.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-noti-form',
  templateUrl: './noti-form.component.html',
  styleUrls: ['./noti-form.component.scss'],
})
export class NotiFormComponent implements OnInit {
  @Input() id: number = 0;
  @Input() clubId: number = 0;
  @Output() atras: EventEmitter<any> = new EventEmitter();

  notificacion: any;
  editar: boolean = false;
  hoy = new Date();
  fechaInicio = new Date();
  fechaInicioString: string = '';
  fechaFin = new Date();
  fechaFinString: string = '';
  descripcion: string = '';
  enlace: string = '';

  errorDescripcion = false;

  constructor(private notificacionService: NotificacionService) {}

  ngOnInit(): void {
    if (this.id > 0)
      this.notificacionService.getNotificacion(this.id).subscribe({
        next: (value) => {
          this.notificacion = value;
          // Hay que convertir a JSDATE porque si no da errores el calendario del html
          const fI = DateTime.fromISO(this.notificacion.fechaInicio);
          this.fechaInicio = fI.toJSDate();
          const fF = DateTime.fromISO(this.notificacion.fechaFin);
          this.fechaFin = fF.toJSDate();
          this.nuevaFecha();
          this.editar = true;
          this.enlace = this.notificacion.enlace;
          this.descripcion = this.notificacion.description;
        },
      });
    else {
      this.nuevaFecha();
    }
  }

  nuevaFecha() {
    this.fechaInicioString = DateTime.fromJSDate(
      this.fechaInicio
    ).toLocaleString();
    this.fechaFinString = DateTime.fromJSDate(this.fechaFin).toLocaleString();
  }

  enviar() {
    if (this.descripcion === '') this.errorDescripcion = true;
    else {
      if (this.editar) {
        this.notificacionService
          .updateNotificacion(
            this.notificacion.id,
            this.descripcion,
            this.fechaInicio,
            this.fechaFin,
            this.enlace
          )
          .subscribe({ next: (value) => this.atras.emit() });
      } else {
        this.notificacionService
          .crearNotificacion(
            this.descripcion,
            this.fechaInicio,
            this.fechaFin,
            this.enlace,
            this.clubId
          )
          .subscribe({ next: (value) => this.atras.emit() });
      }
    }
  }
}
