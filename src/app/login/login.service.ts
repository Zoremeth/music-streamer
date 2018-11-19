import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
    // Temp implementation (Testing purposes only).
    if (username === 'user' && password === 'password') {
      this.loginStream.next(true);
    } else {
      alert('Wrong username/password');
    }
  }

  logout() {
    this.loginStream.next(false);
  }
}
