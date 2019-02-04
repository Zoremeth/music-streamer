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
  public currentUser = '';

  constructor(private http: HttpClient) {
    this.loginStream = new BehaviorSubject(false);
    this.currentUser = sessionStorage.getItem('currentUser') as string;
    if (sessionStorage.getItem('loggedIn') === 'true') {
      this.loginStream.next(true);
    }
  }

  loggedIn$() {
    return this.loginStream.asObservable();
  }

  login(username: string, password: string) {
    this.http.post<LoginObj>('/api/login', { 'username': username, 'password': password })
      .subscribe(results => {
        this.currentUser = username;
        if (results.loggedIn) {
          this.loginStream.next(true);
          sessionStorage.setItem('loggedIn', 'true');
          sessionStorage.setItem('currentUser', username);
        } else {
          alert('Wrong username/password');
          sessionStorage.setItem('loggedIn', 'false');
          sessionStorage.setItem('currentUser', '');
        }
      });
  }

  logout() {
    this.http.get('/api/logout').subscribe(data => console.log(data));
    sessionStorage.clear();
    this.loginStream.next(false);
  }
}
