import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public signIn = (email: string, password: string): Observable<string> => {
    return this.http.post<string>('Authenticate', { email, password });
  }
}
