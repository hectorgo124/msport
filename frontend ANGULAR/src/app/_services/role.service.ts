import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../constants';

const CONTROLLER = 'roles/'


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient) { }

  getRoles(): Observable<any> {
    return this.http.get(API_URL + CONTROLLER + 'all');
  }
}