import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AUTH_URL } from '../constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refresh$() {
    return this._refresh$;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_URL + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  registrar(
    username: string,
    nombre: string,
    apellidos: string,
    sexo: string,
    password: string,
    role: any,
    categoria: any,
    clubId: number
  ): Observable<any> {
    return this.http
      .post(
        AUTH_URL + 'signup',
        {
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
      )
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }
}
