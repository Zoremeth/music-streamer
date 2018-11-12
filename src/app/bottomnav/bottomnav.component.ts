import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottomnav',
  templateUrl: './bottomnav.component.html',
  styleUrls: ['./bottomnav.component.css']
})
export class BottomnavComponent implements OnInit {

  muteStatus = 'volume_up';
  value = 1.0;
  currentTimeInSeconds = 0;
  time = 0;
  disabled = false;
  playerStatusIcon = 'play_arrow';

  constructor() { }

  ngOnInit() {
    this.getCurrentTime();
  }

  get length() {
    const musicPlayer = <HTMLAudioElement>document.getElementById('musicplayer');
    return Math.trunc(musicPlayer.duration);
  }

  changeVolume(value: number) {
    const musicPlayer = <HTMLAudioElement>document.getElementById('musicplayer');
    musicPlayer.volume = value;
  }

  getCurrentTime(): void {
    const musicPlayer = <HTMLAudioElement>document.getElementById('musicplayer');
    setInterval(() => {
      this.time = musicPlayer.currentTime
    }, 1000)
  }

  getPlayerStatusIcon(): string {
    const musicPlayer = <HTMLAudioElement>document.getElementById('musicplayer');
    if (musicPlayer.paused) {
      this.playerStatusIcon = 'play_arrow';
    } else {
      this.playerStatusIcon = 'pause';
    }
    return this.playerStatusIcon;
  }

  seek(value: number) {
    const musicPlayer = <HTMLAudioElement>document.getElementById('musicplayer');
    musicPlayer.currentTime = value;
  }

  togglePlayback(): void {
    const musicPlayer = <HTMLAudioElement>document.getElementById('musicplayer');
    if (musicPlayer.readyState > 2) {
      if (musicPlayer.paused) {
        musicPlayer.play();
      } else {
        musicPlayer.pause();
      }
    } else {
      alert('No valid music (source) loaded. ' + musicPlayer.readyState);
    }
  }

  toggleMute(): void {
    const musicPlayer = <HTMLAudioElement>document.getElementById('musicplayer');
    if (musicPlayer.muted) {
      musicPlayer.muted = false;
      this.disabled = false;
      this.muteStatus = 'volume_up';
    } else {
      musicPlayer.muted = true;
      this.disabled = true;
      this.muteStatus = 'volume_off';
    }
  }
}
