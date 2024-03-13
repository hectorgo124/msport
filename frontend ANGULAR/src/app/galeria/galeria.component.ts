import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { TemporadaService } from '../_services/temporada.service';
import { AlbumService } from '../_services/album.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss'],
})
export class GaleriaComponent implements OnInit {
  mensajeError?: string;
  currentUser: any;

  temporadas: any[] = [];
  todosAlbums: any[] = [];
  albums: any[] = [
    {
      id: null,
      description: null,
      enlace: null,
      temporada: null,
    },
  ];

  albumEditar: any;

  isContenido = false;

  idTemporada: number = 0;

  crearAlbum: boolean = false;

  seleccionados: any[] = [];
  areSelected: boolean = false;

  constructor(
    private tokenService: TokenStorageService,
    private router: Router,
    private temporadaService: TemporadaService,
    private albumService: AlbumService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
    if (!this.currentUser) {
      this.router.navigate(['/home']);
    } else {
      if (this.currentUser.role === 'ROLE_CONTENIDO')
        this.userService.getContenido().subscribe({
          next: (data) => {
            this.isContenido = true;
          },
          error: (err) => {
            this.isContenido = false;
          },
        });

      this.temporadaService.getTemporadas().subscribe({
        next: (data) => {
          this.temporadas = data;
        },
        error: (err) => {
          this.mensajeError = 'No hay temporadas!';
        },
      });

      this.albumService.getClubAlbums(this.currentUser.clubId).subscribe({
        next: (data) => {
          this.todosAlbums = data;
          setTimeout(() => {
            this.filtrarTemporada(0);
          }, 100);
        },
        error: (err) => {
          this.mensajeError = 'No hay albums!';
        },
      });
    }
  }

  filtrarTemporada(temporadaId: number) {
    let descTemp = '';
    this.albums = [];

    if (temporadaId > 0) {
      this.temporadas.forEach((temp) => {
        if (temp.id === temporadaId) descTemp = temp.description;
      });

      this.todosAlbums.forEach((alb) => {
        if (alb.temporadaId === temporadaId) {
          this.albums.push({
            id: alb.id,
            description: alb.description,
            enlace: alb.enlace,
            temporada: descTemp,
          });
        }
      });
    } else {
      this.temporadas.forEach((temp) => {
        descTemp = temp.description;
        this.todosAlbums.forEach((alb) => {
          if (alb.temporadaId === temp.id) {
            this.albums.push({
              id: alb.id,
              description: alb.description,
              enlace: alb.enlace,
              temporada: descTemp,
            });
          }
        });
      });
    }

    if (this.todosAlbums.length === 0)
      this.mensajeError = 'No hay álbums todavia. ';

      this.seleccionados = [];
      this.areSelected = false;
  }

  abrirForm() {
    this.crearAlbum = !this.crearAlbum;
  }

  selec(albumId: number, event: any) {
    const checked = event.target.checked;
    if (checked) this.seleccionados.push(albumId);
    else this.eliminarSelec(albumId);

    this.comprobarSelec();
  }

  eliminarSelec(albumId: number) {
    for (let i = 0; i < this.seleccionados.length; i++) {
      if (this.seleccionados[i] === albumId) {
        this.seleccionados.splice(i, 1);
        break;
      }
    }
  }

  comprobarSelec() {
    if (this.seleccionados.length > 0) this.areSelected = true;
    else this.areSelected = false;
  }

  eliminar() {
    this.albumService.delete(this.seleccionados).subscribe({
      next() {
        window.location.reload();
      },
    });
  }

  editar(albumId: number) {
    this.todosAlbums.forEach((alb) => {
      if (albumId === alb.id) this.albumEditar = alb;
    });

    this.crearAlbum = true;
  }
}
