import { Component, OnInit } from '@angular/core';
import { MusicPlayerService } from '../shared/player';

@Component({
  selector: 'app-bottomnav',
  templateUrl: './bottomnav.component.html',
  styleUrls: ['./bottomnav.component.css']
})
export class BottomnavComponent implements OnInit {

  muteStatus = 'volume_up';
  currentTimeInSeconds = 0;
  time = 0;
  disabled = false;
  playbackIcon = 'play_arrow';
  paused = false;
  max = 0;

  constructor(private musicService: MusicPlayerService) {
    this.musicService.currentTime$.subscribe((seconds: number) => this.time = seconds);
    this.musicService.playbackStatus$.subscribe((status: boolean) => this.paused = status);
    this.musicService.length$.subscribe((seconds: number) => this.max = seconds);
    this.musicService.playbackStatus$.subscribe((status: boolean) => this.setPlaybackIcon(status));
  }

  ngOnInit() {

  }

  toggleMute() {
    this.musicService.toggleMute() ? this.disabled = true : this.disabled = false;
    this.disabled ? this.muteStatus = 'volume_off' : this.muteStatus = 'volume_up';
  }

  togglePlayback(): void {
    this.paused ? this.musicService.resume() : this.musicService.pause();
  }

  setPlaybackIcon(status: boolean) {
    status ? this.playbackIcon = 'play_arrow' : this.playbackIcon = 'pause';
  }
}
