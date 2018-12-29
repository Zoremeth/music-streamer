import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface LoginObj {
  loggedIn: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginStream: BehaviorSubject<boolean>;


  constructor(private http: HttpClient) {
    this.loginStream = new BehaviorSubject(false);
  }

  loggedIn$() {
    return this.loginStream.asObservable();
  }

  login(username: string, password: string) {
    this.http.post<LoginObj>('/api/login', { 'username': username, 'password': password })
      .subscribe(results => {
        return results.loggedIn ? this.loginStream.next(true) : alert('Wrong username/password');
      });
  }

  logout() {
    this.http.get('api/logout');
    this.loginStream.next(false);
  }
}
