import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MusicPlayerService } from '../shared/player';

export interface Song {
  url: string;
  title: string;
  artist: string;
  album: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private musicService: MusicPlayerService) { }

  ngOnInit() {
  }

  isOddOrEven(i: number): string {
    if (i % 2 === 0) {
      return 'tr-1';
    } else {
      return 'tr-2';
    }
  }

  play(index: number): void {
    this.musicService.load(index);
    this.musicService.play();
  }
}
