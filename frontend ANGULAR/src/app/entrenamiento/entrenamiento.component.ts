import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { SesionService } from '../_services/sesion.service';
import { EntrenamientoService } from '../_services/entrenamiento.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { saveAs } from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-entrenamiento',
  templateUrl: './entrenamiento.component.html',
  styleUrls: ['./entrenamiento.component.scss'],
})
export class EntrenamientoComponent implements OnInit {
  @ViewChild('tablaEntrene') tablaEntrene: ElementRef = new ElementRef<any>(
    null
  );

  titulo: string = '';

  content?: string;
  currentUser: any;

  entrene: any;

  fecha = new Date();
  fechaLuxon = DateTime.now();

  maximo: string | null = Date();

  diasSemana: string[] = [];
  inicioSemana: string | null = '';
  finalSemana: string | null = '';

  sesion: any;

  usuario: any;

  constructor(
    private tokenService: TokenStorageService,
    private router: Router,
    private sesionService: SesionService,
    private entreneService: EntrenamientoService,
    private userService: UserService,
    private sanitazer : DomSanitizer
  ) {}

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();

    if (!this.currentUser) {
      this.router.navigate(['/home']);
    } else {
      this.actualizarUsuario();
      // para que los domingos puedan ver el entrene de la semana siguiente
      if (this.fechaLuxon.weekday === 7)
        this.maximo = this.fechaLuxon.plus({ days: 7 }).toISODate();
      else {
        let n = this.fechaLuxon.weekday;
        this.maximo = this.fechaLuxon.plus({ days: 7 - n }).toISODate();
      }
      this.llenarDiasSemana();
    }
  }

  getSafeUrl() {
    if (this.sesion.enlace) return this.sanitazer.bypassSecurityTrustResourceUrl(this.sesion.enlace);
    else return '';
  }

  actualizarUsuario() {
    this.userService.getUser(this.currentUser.id).subscribe({
      next: (value) => {
        this.usuario = value;
        if (this.usuario.entrenamientoId) this.getEntrene();
      },
    });
  }

  getSesiones() {
    this.sesionService
      .getSesiones(
        this.fechaLuxon.weekNumber,
        this.fechaLuxon.year,
        this.entrene.id
      )
      .subscribe((r) => (this.sesion = r));
  }

  getEntrene() {
    this.entreneService
      .getEntrenamiento(this.usuario.entrenamientoId)
      .subscribe({
        next: (value) => {
          this.entrene = value;
          this.getSesiones();
        },
      });
  }

  nuevaFecha(event: any) {
    this.fechaLuxon = DateTime.fromJSDate(event);
    this.llenarDiasSemana();
    if (this.entrene) this.getSesiones();
  }

  llenarDiasSemana() {
    this.diasSemana = [];

    const inicioDeSemana = this.fechaLuxon.startOf('week');

    for (let i = 0; i <= 6; i++) {
      this.diasSemana.push(inicioDeSemana.plus({ days: i }).toLocaleString());
    }

    this.inicioSemana = inicioDeSemana.toLocaleString();
    this.finalSemana = inicioDeSemana.plus({ days: 6 }).toLocaleString();
    this.titulo =
      'Entrene semana ' + this.inicioSemana + ' - ' + this.finalSemana;
  }

  downloadAsPDF() {

    const documentDefinition = {
      info: {
        title: this.titulo,
        author: 'MSPORT',
        filename: this.titulo,
      },
      content: [
        { text: this.titulo, fontSize: 25, bold: true },
        {
          styles: 'tabla',
          table: {
            widths: [100, '*'],
            body: [
              [
                `Lunes
              ` + this.diasSemana[0],
                this.sesion.lunes,
              ],
              [
                `Martes
              ` + this.diasSemana[1],
                this.sesion.martes,
              ],
              [
                `Miercoles
              ` + this.diasSemana[2],
                this.sesion.miercoles,
              ],
              [
                `Jueves
              ` + this.diasSemana[3],
                this.sesion.jueves,
              ],
              [
                `Viernes
              ` + this.diasSemana[4],
                this.sesion.viernes,
              ],
              [
                `Sábado
              ` + this.diasSemana[5],
                this.sesion.sabado,
              ],
              [
                `Domingo
              ` + this.diasSemana[6],
                this.sesion.domingo,
              ],
            ],
          },
        },
      ],
    };

    const pdf = pdfMake.createPdf(documentDefinition);

    pdf.getBlob((blob) => {
      saveAs(blob, this.titulo);
    });

    pdf.open();
  }
}
