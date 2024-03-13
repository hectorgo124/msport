import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EntrenamientoService } from 'src/app/_services/entrenamiento.service';

@Component({
  selector: 'app-form-entrenamiento',
  templateUrl: './form-entrenamiento.component.html',
  styleUrls: ['./form-entrenamiento.component.scss'],
})
export class FormEntrenamientoComponent {
  @Input() clubId: number = 0;

  @Input() temporadas: any[] = [];
  @Output() atras: EventEmitter<any> = new EventEmitter();

  form: any = {
    nombre: null,
    temporada: null,
  };
  isSuccessful = false;
  errorEnviar = false;

  errorMessage: string = '';

  constructor(private entrenamientoService: EntrenamientoService) {}

  onSubmit() {
    const { nombre, temporada } = this.form;

    this.entrenamientoService
      .crearEntrenamiento(nombre, this.clubId, temporada)
      .subscribe({
        next: (data) => {
          this.isSuccessful = true;
          this.errorEnviar = false;
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.errorEnviar = true;
        },
      });
  }

  recargar() {
    window.location.reload();
  }
}
