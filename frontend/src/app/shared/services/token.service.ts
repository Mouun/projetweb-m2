import { Injectable } from '@angular/core';
import { TokenProfile } from '../models/TokenProfile';
import * as jwt_decode from 'jwt-decode';

export const TOKEN_KEY = 'jwt_token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  public removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  public isAuthenticated(): boolean {
    return !(this.getToken() === null);
  }

  public getTokenProfile(): TokenProfile {
    const token = this.getToken();
    if (!token) {
      return null;
    } else {
      const decoded = jwt_decode(token);
      return {
        id: decoded.unique_name,
        email: decoded.email
      } as TokenProfile;
    }
  }
}
