import { Component, OnInit } from '@angular/core';
import { MusicControlService } from '../shared/music-control.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  songs = [
      { "url": "http://localhost/&Z.flac", "title": "&Z", "artist": "Mizayuki", "album": "Aldnoah Zero"},
      { "url": "http://localhost/AboutMe.ogg", "title": "About Me", "artist": "Nicode", "album": "About Me - Nicode"},
  ]

  constructor(private musicService: MusicControlService) { }

  ngOnInit() {
  }

  play(streamURL: string): void {
    // const prompt = <string>window.prompt("Enter a URL", "http://domain.tld/");
    const musicPlayer = <HTMLAudioElement>document.getElementById('musicplayer');
    this.musicService.play(streamURL);
    // this.musicService.seekbarMax = Math.trunc(musicPlayer.duration);
  }
}
