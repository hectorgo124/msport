import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../constants';

const CONTROLLER = 'temporadas/'


@Injectable({
  providedIn: 'root'
})
export class TemporadaService {
  constructor(private http: HttpClient) { }

  getTemporadas(): Observable<any> {
    return this.http.get(API_URL + CONTROLLER + 'all');
  }

  getTemporada(id: number): Observable<any> {
    return this.http.get(API_URL + CONTROLLER + id);
  }
}