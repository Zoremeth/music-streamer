import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'music-streamer';
  loginState = false;

  constructor(private loginService: LoginService) {
    this.loginService.loggedIn$().subscribe((state: boolean) => this.loginState = state);
   }
}
