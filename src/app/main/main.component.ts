import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MusicPlayerService } from '../shared/player';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  songs = [];

  constructor(private http: HttpClient, private musicService: MusicPlayerService) { }

  ngOnInit() {
    this.getSongs();
  }

  getSongs(): void {
    // Implement CORS
    // Template JSON entry { "url": "", "title": "", "artist": "", "album": ""},
    const url = 'http://localhost/music/songs.json';
    this.http.get(url).subscribe((data: any) => {
      this.songs = data;
    });
  }

  isOddOrEven(i: number): string {
    if (i % 2 === 0) {
      return 'tr-1';
    } else {
      return 'tr-2';
    }
  }

  play(streamURL: string): void {
    this.musicService.load(streamURL);
    this.musicService.play();
  }
}
