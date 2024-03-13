import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { AlbumService } from 'src/app/_services/album.service';

@Component({
  selector: 'app-form-album',
  templateUrl: './form-album.component.html',
  styleUrls: ['./form-album.component.scss'],
})
export class FormAlbumComponent implements OnChanges {
  @Input() clubId: number = 0;
  @Input() album: any;

  @Input() temporadas: any[] = [];
  @Output() atras: EventEmitter<any> = new EventEmitter();

  form: any = {
    description: null,
    temporada: null,
    enlace: null,
  };
  isSuccessful = false;
  errorEnviar = false;

  errorMessage: string = '';
  isEditar: boolean = false;
  accion : string = 'Añadir';

  constructor(private albumService: AlbumService) {}

  ngOnChanges(): void {
    if (this.album) {
      this.isEditar = true;
      this.accion = 'Editar';

      this.form = {
        description: this.album.description,
        temporada: this.album.temporadaId,
        enlace: this.album.enlace,
      };
    }
  }

  onSubmit() {
    const { description, temporada, enlace } = this.form;

    if(this.isEditar) {
      this.albumService.updateAlbum(this.album.id, description, enlace, this.clubId, temporada).subscribe(
        {
          next: (data) => {
            this.isSuccessful = true;
            this.errorEnviar = false;
            setTimeout(() => {
              this.recargar();
            }, 5000);
          },
          error: (err) => {
            this.errorMessage = err.error.message;
            this.errorEnviar = true;
          },
        }
      )
    } else {
      this.albumService
      .insertarAlbum(description, enlace, this.clubId, temporada)
      .subscribe({
        next: (data) => {
          this.isSuccessful = true;
          this.errorEnviar = false;
          // setTimeout(() => {
          //   this.recargar();
          // }, 5000);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.errorEnviar = true;
        },
      });
    }
    
  }

  recargar() {
    window.location.reload();
  }
}
