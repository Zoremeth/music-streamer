import { Component, OnInit } from '@angular/core';
import { MusicPlayerService } from '../shared/player';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  constructor(private musicService: MusicPlayerService) {
  }

  ngOnInit() {
  }

  lol(): void {
    alert("Hello World!");
  }

}
