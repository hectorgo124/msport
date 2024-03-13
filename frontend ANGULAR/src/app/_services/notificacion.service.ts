import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_URL } from '../constants';

const CONTROLLER = 'notificaciones/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refresh$() {
    return this._refresh$;
  }

  getNotificacionesClub(clubId: number): Observable<any> {
    return this.http.get(API_URL + CONTROLLER + 'club/' + clubId);
  }

  getActuales(clubId: number):Observable <any> {
    return this.http.get(API_URL + CONTROLLER + 'club/actuales/' + clubId)
  }

  getNotificacion(id: number): Observable<any> {
    return this.http.get(API_URL + CONTROLLER + id);
  }

  crearNotificacion(
    description: string,
    fechaInicio: Date,
    fechaFin: Date,
    enlace: string,
    clubId: number
  ): Observable<any> {
    return this.http
      .post(
        API_URL + CONTROLLER + 'new',
        {
          description,
          fechaInicio,
          fechaFin,
          enlace,
          clubId,
        },
        httpOptions
      )
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  updateNotificacion(
    id: number,
    description: string,
    fechaInicio: Date,
    fechaFin: Date,
    enlace: string
  ): Observable<any> {
    return this.http
      .post(
        API_URL + CONTROLLER + 'update',
        {
          id,
          description,
          fechaInicio,
          fechaFin,
          enlace,
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
