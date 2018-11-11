import { Component, OnInit } from '@angular/core';
import { MusicPlayerService } from '../shared/player';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  songs = [];

  constructor(private musicService: MusicPlayerService, private http: HttpClient) { }

  ngOnInit() {
    this.getSongs();
  }

  getSongs(): void {
    //Implement CORS
    //Template JSON entry { "url": "", "title": "", "artist": "", "album": ""},
    const url = 'http://localhost/songs.json';
    let songsJSON = this.http.get(url).subscribe((data: any) => {
      this.songs = data;
    });
  }

  isOddOrEven(i: number): string {
    if (i % 2 == 0) {
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
