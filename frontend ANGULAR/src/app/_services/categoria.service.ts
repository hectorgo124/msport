import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../constants';

const CONTROLLER = 'categorias/'

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  constructor(private http: HttpClient) { }

  getCategorias(): Observable<any> {
    return this.http.get(API_URL + CONTROLLER + 'all');
  }

  getCategoria(id: number): Observable<any> {
    return this.http.get(API_URL + CONTROLLER + id);
  }
}