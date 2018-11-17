import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  login(username: string, password: string): void {
    this.loginService.login(username, password);
  }

}
