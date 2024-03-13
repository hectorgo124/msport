import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { CategoriaService } from '../_services/categoria.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  categoria: string = '';
  sex: string = '';

  visiblity: boolean = false;
  iconVisibility: string = 'visibility';
  errorContrasenya: boolean = false;
  newPassword: string = '';
  isSuccessful = false;
  modificar = true;

  constructor(
    private token: TokenStorageService,
    private router: Router,
    private userService: UserService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if (!this.currentUser) this.router.navigate(['/home']);
    else
      this.userService.getUser(this.currentUser.id).subscribe({
        next: (data) => {
          this.currentUser = data;

          this.categoriaService
            .getCategoria(parseInt(this.currentUser.categoriaId))
            .subscribe({
              next: (data) => {
                this.categoria = data.name.toUpperCase();
              },
            });

          this.currentUser.sexo === 'Hombre'
            ? (this.sex = 'male')
            : (this.sex = 'female');
        },
      });
  }

  comprobarContrasenya() {
    this.modificar = false;
    this.newPassword.length < 6
      ? (this.errorContrasenya = true)
      : (this.errorContrasenya = false);
  }

  mostrarContrasenya() {
    var tipo = document.getElementById('password') as HTMLInputElement;

    tipo.type == 'password' ? (tipo.type = 'text') : (tipo.type = 'password');

    this.visiblity = !this.visiblity;

    !this.visiblity
      ? (this.iconVisibility = 'visibility')
      : (this.iconVisibility = 'visibility_off');
  }

  update() {
    if (this.newPassword)
      this.userService
        .updateUser(
          this.currentUser.id,
          this.currentUser.username,
          this.currentUser.nombre,
          this.currentUser.apellidos,
          this.currentUser.sexo,
          this.newPassword,
          this.currentUser.roleId,
          this.currentUser.categoriaId,
          this.currentUser.clubId
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
  recargar() {
    window.location.reload();
  }
}
