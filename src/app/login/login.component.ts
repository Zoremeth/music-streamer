import { Component, OnInit, HostBinding } from '@angular/core';
import { LoginService } from './login.service';
import { MatDialog } from '@angular/material/dialog';
import { ThemeService } from '../shared/theme';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private loginService: LoginService, public dialog: MatDialog, private themeService: ThemeService) { }

  ngOnInit() { }

  login(username: string, password: string): void {
    this.loginService.login(username, password);
  }

  enterLogin(event: KeyboardEvent, username: string, password: string): void {
    if (event.key === 'Enter') {
      this.loginService.login(username, password);
    }
  }
}
