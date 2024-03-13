import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FotosService {
  fotos: string[];

  constructor() {
    this.fotos = ['hector', 'lidia', 'maria', 'quique'];
  }

  getFotoAleatoria() {
    return this.fotos[Math.floor(Math.random() * this.fotos.length)];
  }
}
