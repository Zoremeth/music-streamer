import { Component, OnInit } from '@angular/core';
import { MusicControlService } from '../shared/music-control.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private musicService: MusicControlService) { }

  ngOnInit() {
  }

  play(streamURL: string): void {
    const prompt = <string>window.prompt("Enter a URL", "http://domain.tld/");
    const musicPlayer = <HTMLAudioElement>document.getElementById('musicplayer');
    this.musicService.play(prompt);
    // this.musicService.seekbarMax = Math.trunc(musicPlayer.duration);
  }
}
