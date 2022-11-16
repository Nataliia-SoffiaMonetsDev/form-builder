import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, User } from '../_helpers/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(
    private http: HttpClient,
  ) { }

  register(user: User){
    return this.http.post<User>('http://localhost:3000/register', user)
  }

  login(user: User){
    return this.http.post<Login>('http://localhost:3000/login', user);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

}
