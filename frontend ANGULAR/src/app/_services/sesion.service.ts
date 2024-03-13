import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../constants';

const CONTROLLER = 'sesiones/'


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class SesionService {
  constructor(private http: HttpClient) {}

  getTodas(): Observable<any> {
    return this.http.get(API_URL + CONTROLLER + 'all');
  }

  getSesiones(semana: number, anyo: number, id: number): Observable<any> {
    return this.http.get(API_URL + CONTROLLER + semana + '/' + anyo + '/' + id);
  }

  insertarSesion(
    semana: number,
    anyo: number,
    lunes: string,
    martes: string,
    miercoles: string,
    jueves: string,
    viernes: string,
    sabado: string,
    domingo: string,
    enlace: string, 
    entrenamientoId: number

  ): Observable<any> {
    return this.http.post(
      API_URL + CONTROLLER + 'insertar',
      {
        semana,
        anyo,
        lunes,
        martes,
        miercoles,
        jueves,
        viernes,
        sabado,
        domingo,
        enlace,
        entrenamientoId,
      },
      httpOptions
    );
  }

  update(
    id: number,
    lunes: string,
    martes: string,
    miercoles: string,
    jueves: string,
    viernes: string,
    sabado: string,
    domingo: string,
    enlace : string
  ): Observable<any> {
    return this.http.post(
      API_URL + CONTROLLER + 'update',
      { id, lunes, martes, miercoles, jueves, viernes, sabado, domingo, enlace },
      httpOptions
    );
  }

  agregarTipo(id: number, tipo: number): Observable<any> {
    return this.http.post(
      API_URL + CONTROLLER + 'tipo',
      {
        id,
        tipo,
      },
      httpOptions
    );
  }
}
