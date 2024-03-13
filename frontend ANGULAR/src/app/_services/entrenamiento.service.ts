import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_URL } from '../constants';

const CONTROLLER = 'entrenamientos/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class EntrenamientoService {
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refresh$() {
    return this._refresh$;
  }

  getEntrenamientos(): Observable<any> {
    return this.http.get(API_URL + CONTROLLER + 'all');
  }

  getEntrenamientosClub(clubId: number): Observable<any> {
    return this.http.get(API_URL + CONTROLLER + 'club/' + clubId);
  }

  getEntrenamiento(id: number): Observable<any> {
    return this.http.get(API_URL + CONTROLLER + id);
  }

  getEntrenamientosTemporada(temporadaId: number): Observable<any> {
    return this.http.get(API_URL + CONTROLLER + 'temporada/' + temporadaId);
  }

  crearEntrenamiento(
    nombre: string,
    clubId: number,
    temporadaId: number
  ): Observable<any> {
    return this.http
      .post(
        API_URL + CONTROLLER + 'new',
        {
          nombre,
          clubId,
          temporadaId,
        },
        httpOptions
      )
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  updateEntrenamiento(
    id: number,
    nombre: string,
    temporadaId: number
  ): Observable<any> {
    return this.http.post(
      API_URL + CONTROLLER + 'update',
      { id, nombre, temporadaId },
      httpOptions
    ).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );;
  }

  agregarTipo(id: number, tipo: number): Observable<any> {
    return this.http
      .post(
        API_URL + CONTROLLER + 'tipo',
        {
          id,
          tipo,
        },
        httpOptions
      )
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API_URL + CONTROLLER + 'delete/' + id).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
}
