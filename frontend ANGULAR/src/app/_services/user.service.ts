import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_URL } from '../constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refresh$() {
    return this._refresh$;
  }

  getUsers(clubId: number): Observable<any> {
    return this.http.get(API_URL + 'users/' + clubId);
  }

  getUser(id: number): Observable<any> {
    return this.http.get(API_URL + 'user/' + id);
  }
  updateUser(
    id: number,
    username: string,
    nombre: string,
    apellidos: string,
    sexo: string,
    password: string,
    role: any,
    categoria: any,
    clubId: number
  ): Observable<any> {
    return this.http.post(
      API_URL + 'user/update',
      {
        id,
        username,
        nombre,
        apellidos,
        sexo,
        password,
        role,
        categoria,
        clubId,
      },
      httpOptions
    ).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );;
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(API_URL + 'user/delete/' + id).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );;;
  }

  getByEntrene(entreneId: number, clubId: number): Observable<any> {
    return this.http.get(API_URL + 'users/entrene/' + clubId + '/' + entreneId);
  }

  setEntrene(id: number, entrenamientoId: number): Observable<any> {
    return this.http
      .post(
        API_URL + 'user/entrene',
        {
          id,
          entrenamientoId,
        },
        httpOptions
      )
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  getContenido(): Observable<any> {
    return this.http.get(API_URL + 'contenido', {
      withCredentials: true,
      responseType: 'text',
    });
  }

  getAdmin(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getEntrenador(): Observable<any> {
    return this.http.get(API_URL + 'entrenador', { responseType: 'text' });
  }
}
