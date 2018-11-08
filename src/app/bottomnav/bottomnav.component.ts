import { Component, OnInit } from '@angular/core';
import { MusicControlService } from '../music-control.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-bottomnav',
  templateUrl: './bottomnav.component.html',
  styleUrls: ['./bottomnav.component.css']
})
export class BottomnavComponent implements OnInit {

  playbackStatusIcon = 'play_arrow';
  currentTime = 0;

  constructor(public musicService: MusicControlService) { }

  ngOnInit() {
    this.getCurrentTime();
  }

  getCurrentTime(): void {
    const musicPlayer = <HTMLAudioElement>document.getElementById('musicplayer');
    setInterval(() => {
      //Make it properly display time rather than the amount of seconds
      this.currentTime = Math.trunc(musicPlayer.currentTime);
    }, 1000);
  }

  togglePlayback(): void {
    const musicPlayer = <HTMLAudioElement>document.getElementById('musicplayer');
    if (musicPlayer.readyState > 2) {
      if (musicPlayer.paused) {
        musicPlayer.play();
        this.playbackStatusIcon = 'pause';
      } else {
        musicPlayer.pause();
        this.playbackStatusIcon = 'play_arrow';
      }
    } else {
      alert('No valid music (source) loaded. ' + musicPlayer.readyState);
    }
  }
  test(): void {
    var prompt = window.prompt("Enter a URL", "http://domain.tld/");
    console.log('URL: ' + prompt)
    this.musicService.play(prompt);
  }
}
