import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { FotosService } from '../_services/fotos.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  logged: boolean = false;
  foto = "url('../../assets/";

  constructor(private router: Router, private token : TokenStorageService, private fotoService: FotosService) {
    this.foto += this.fotoService.getFotoAleatoria() + ".jpeg')";
  }

  ngOnInit() : void {
    if(this.token.getToken()) this.logged = true;
  }

  cambiarPagLogin() {
    this.router.navigate(['/login']);
  }

}
