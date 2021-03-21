import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { forkJoin, Observable } from 'rxjs';
import { Resolve } from '@angular/router';
import { UpdateUser } from '../models/UpdateUser';
import { UpdatePasswordUser } from '../models/UpdatePasswordUser';

export interface UserCreationInfo {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public signUp = (userCreationInfo: UserCreationInfo): Observable<User> => {
    return this.http.post<User>(`RegisterUser`, userCreationInfo);
  }

  public getMe = (): Observable<User> => {
    return this.http.get<User>('Me');
  }

  public updateProfile = (user: UpdateUser): Observable<User> => {
    return this.http.post<User>('UpdateUser', user);
  }

  public changePassword = (user: UpdatePasswordUser): Observable<User> => {
    return this.http.post<User>('ChangePassword', user);
  }
}

@Injectable()
export class UserResolver implements Resolve<any[]> {

  constructor(
    private userService: UserService
  ) {
  }

  resolve(): Observable<any[]> {
    const productResponse = this.userService.getMe();

    return forkJoin([productResponse]);
  }
}
