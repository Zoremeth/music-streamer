import { Component, OnInit } from '@angular/core';
import { MusicControlService } from '../shared/music-control.service';

@Component({
  selector: 'app-bottomnav',
  templateUrl: './bottomnav.component.html',
  styleUrls: ['./bottomnav.component.css']
})
export class BottomnavComponent implements OnInit {

  currentTime = '00:00';
  muteStatus = 'volume_up';
  value = 1.0;
  currentTimeInSeconds = 0;
  seekbarMax = 500;
  time = 0;

  constructor(public musicService: MusicControlService) { }

  ngOnInit() {
    this.getCurrentTime();
  }

  seek(): void {
    const musicPlayer = <HTMLAudioElement>document.getElementById('musicplayer');
    const prompt = <string>window.prompt("Enter time in seconds", "");
    musicPlayer.currentTime = parseInt(prompt)
  }

  getSongLength(): string {
    const musicPlayer = <HTMLAudioElement>document.getElementById('musicplayer');
    if (musicPlayer.readyState > 2) {
      let minutes = Math.trunc(musicPlayer.duration / 60);
      let seconds = (musicPlayer.duration / 60 - minutes) * 60;

      return "0" + minutes + ":" + Math.trunc(seconds);
    } else {
      return '00:00';
    }
  }

  getCurrentTime(): void {
    const musicPlayer = <HTMLAudioElement>document.getElementById('musicplayer');
    setInterval(() => {
      this.time = musicPlayer.currentTime
    }, 1000)
  }

  getPlayerStatusIcon(): string {
    const musicPlayer = <HTMLAudioElement>document.getElementById('musicplayer');
    return this.musicService.getStatus();
  }

  togglePlayback(): void {
    const musicPlayer = <HTMLAudioElement>document.getElementById('musicplayer');
    if (musicPlayer.readyState > 2) {
      if (musicPlayer.paused) {
        musicPlayer.play();
      } else {
        musicPlayer.pause();
      }
      this.musicService.getStatus();
    } else {
      alert('No valid music (source) loaded. ' + musicPlayer.readyState);
    }
  }

  toggleMute(): void {
    const musicPlayer = <HTMLAudioElement>document.getElementById('musicplayer');
    if (musicPlayer.muted) {
      musicPlayer.muted = false;
      this.muteStatus = 'volume_up';
    } else {
      musicPlayer.muted = true;
      this.muteStatus = 'volume_off';
    }
  }

  play(streamURL: string): void {
    const prompt = <string>window.prompt("Enter a URL", "http://domain.tld/");
    const musicPlayer = <HTMLAudioElement>document.getElementById('musicplayer');
    this.musicService.play(prompt);
    this.seekbarMax = Math.trunc(musicPlayer.duration);
  }
}
