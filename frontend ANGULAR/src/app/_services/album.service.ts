import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { API_URL } from '../constants';

const CONTROLLER = 'categorias/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private http: HttpClient) {}

  getAlbums(): Observable<any> {
    return this.http.get(API_URL + CONTROLLER + 'all');
  }

  getAlbum(id: number): Observable<any> {
    return this.http.get(API_URL + CONTROLLER + id);
  }

  getClubAlbums(clubId: number): Observable<any> {
    return this.http.get(API_URL + CONTROLLER + 'club/' + clubId);
  }

  insertarAlbum(
    description: string,
    enlace: string,
    clubId: number,
    temporadaId: number
  ): Observable<any> {
    return this.http.post(
      API_URL + CONTROLLER + 'new',
      {
        description,
        enlace,
        clubId,
        temporadaId,
      },
      httpOptions
    );
  }

  updateAlbum(
    id: number,
    description: string,
    enlace: string,
    clubId: number,
    temporadaId: number
  ): Observable<any> {
    return this.http.post(
      API_URL + 'update',
      { id, description, enlace, clubId, temporadaId },
      httpOptions
    );
  }

  delete(albums: any[]): Observable<any> {
    const deletes = []; 
    for (const id of albums) {
      const url = API_URL + 'delete/' + id;
      const req = this.http.delete(url);
      deletes.push(req); // GUARDAR 
    }
    return forkJoin(deletes); // ENVIAR TODOS
  }
}
