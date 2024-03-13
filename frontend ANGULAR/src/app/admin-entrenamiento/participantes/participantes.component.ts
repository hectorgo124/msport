import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/_services/categoria.service';
import { UserService } from 'src/app/_services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.scss'],
})
export class ParticipantesComponent implements OnInit {
  @Output() atras: EventEmitter<any> = new EventEmitter();
  @Input() entrene: any;
  @Input() clubId: number = 0;

  suscription: Subscription = new Subscription();

  categorias: any[] = [];
  usuarioSinEntrene: any[] = [];
  idCategoria: number = 0;
  usuariosEntrene: any[] = [];

  // usuarios filtrados
  usuarios: any[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.suscription = this.userService.refresh$.subscribe(() => {
      this.getUsarioEntrene();
      this.getUsarioSinEntrene();
    });

    this.categoriaService
      .getCategorias()
      .subscribe((r) => (this.categorias = r));

    // Usuarios del entrenamiento
    this.getUsarioEntrene();
    // Usuarios sin entrenamiento
    this.getUsarioSinEntrene();
  }
  getUsarioEntrene() {
    this.userService
      .getByEntrene(this.entrene.id, this.clubId)
      .subscribe((r) => (this.usuariosEntrene = r));
  }

  getUsarioSinEntrene() {
    this.userService.getByEntrene(0, this.clubId).subscribe({
      next: (value) => {
        this.usuarioSinEntrene = value;
        this.filtrarCategoria(this.idCategoria);
      },
    });
  }

  agregarUsuario(id: number) {
    this.userService.setEntrene(id, this.entrene.id).subscribe();
  }
  quitarUsuario(id: number) {
    this.userService.setEntrene(id, 0).subscribe();
  }

  filtrarCategoria(categoriaId: number) {
    this.usuarios = [];

    this.usuarioSinEntrene.forEach((usuario) => {
      if (usuario.categoriaId === categoriaId || categoriaId === 0) {
        this.usuarios.push({
          id: usuario.id,
          nombre: usuario.nombre,
          apellidos: usuario.apellidos,
          sexo: usuario.sexo,
        });
      }
    });
  }
}
