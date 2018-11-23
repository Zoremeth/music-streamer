import { Component, OnInit } from '@angular/core';
import { MusicPlayerService } from '../shared/player';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  constructor(public musicService: MusicPlayerService, private loginService: LoginService) {
  }

  ngOnInit() {
  }

  logout(): void {
    this.musicService.pause();
    this.loginService.logout();
  }

}
