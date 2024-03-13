import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private cookieService : CookieService) { }

  signOut(): void {
    this.cookieService.deleteAll();
  }

  public saveToken(token: string): void {
    this.cookieService.delete(TOKEN_KEY);
    this.cookieService.set(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return this.cookieService.get(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    this.cookieService.delete(USER_KEY);
    this.cookieService.set(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = this.cookieService.get(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }
}