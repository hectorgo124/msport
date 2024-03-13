import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../constants';

const CONTROLLER = 'clubs/'

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  constructor(private http: HttpClient) { }

  getClubs(): Observable<any> {
    return this.http.get(API_URL + CONTROLLER + 'all');
  }

  getClub(id : number): Observable<any> {
    return this.http.get(API_URL + CONTROLLER + id);
  }
}