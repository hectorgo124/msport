import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { CategoriaService } from 'src/app/_services/categoria.service';
import { RoleService } from 'src/app/_services/role.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnChanges {
  @Input() clubId: number = 0;
  @Input() user: any;
  @Output() atras: EventEmitter<any> = new EventEmitter();

  form: any = {
    username: null,
    nombre: null,
    apellidos: null,
    sexo: null,
    password: null,
    role: null,
    categoria: null,
  };
  editar = false;
  eliminar = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  roles: any[] = [];
  categorias: any[] = [];

  visiblity: boolean = false;
  iconVisibility: string = 'visibility';

  constructor(
    private authService: AuthService,
    private roleService: RoleService,
    private categoriaService: CategoriaService,
    private userService: UserService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.roleService.getRoles().subscribe((r) => (this.roles = r));

    this.categoriaService
      .getCategorias()
      .subscribe((r) => (this.categorias = r));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user) {
      this.form = {
        username: this.user.username,
        nombre: this.user.nombre,
        apellidos: this.user.apellidos,
        sexo: this.user.sexo,
        password: null,
        role: this.user.roleId,
        categoria: this.user.categoriaId,
      };
      this.editar = true;
      this.eliminar = false;
    } else {
      this.editar = false;
      this.eliminar = false;
    }
  }

  onSubmit(): void {
    const { username, nombre, apellidos, sexo, password, role, categoria } =
      this.form;

    if (!this.editar) {
      this.authService
        .registrar(
          username,
          nombre,
          apellidos,
          sexo,
          password,
          role,
          categoria,
          this.clubId
        )
        .subscribe({
          next: (data) => {
            this.isSuccessful = true;
            this.isSignUpFailed = false;
            setTimeout(() => {
              this.atras.emit(null);
            }, 1000);
          },
          error: (err) => {
            this.errorMessage = err.error.message;
            this.isSignUpFailed = true;
          },
        });
    } else {
      this.userService
        .updateUser(
          this.user.id,
          username,
          nombre,
          apellidos,
          sexo,
          password,
          role,
          categoria,
          this.clubId
        )
        .subscribe({
          next: (data) => {
            this.isSuccessful = true;
            this.isSignUpFailed = false;
            setTimeout(() => {
              this.atras.emit(null);
            }, 1000);
          },
          error: (err) => {
            this.errorMessage = err.error.message;
            this.isSignUpFailed = true;
          },
        });
    }
  }

  mostrarContrasenya() {
    var tipo = document.getElementById('password') as HTMLInputElement;

    tipo.type == 'password' ? (tipo.type = 'text') : (tipo.type = 'password');

    this.visiblity = !this.visiblity;

    !this.visiblity
      ? (this.iconVisibility = 'visibility')
      : (this.iconVisibility = 'visibility_off');
  }

  eliminarUser() {
    this.userService.deleteUser(this.user.id).subscribe({
      next: (data) => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        setTimeout(() => {
          this.atras.emit(null);
        }, 1000);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      },
    });

    this.eliminar = true;

    if (this.user.id === this.tokenStorageService.getUser().id) this.logout();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
