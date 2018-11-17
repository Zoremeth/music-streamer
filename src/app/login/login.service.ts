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
    // Implement login logic
      this.loginStream.next(true);
  }

  logout() {
    this.loginStream.next(false);
  }
}
