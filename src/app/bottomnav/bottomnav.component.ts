import { Component, OnInit } from '@angular/core';
import { MusicPlayerService } from '../shared/player';

@Component({
  selector: 'app-bottomnav',
  templateUrl: './bottomnav.component.html',
  styleUrls: ['./bottomnav.component.css']
})
export class BottomnavComponent implements OnInit {

  muteStatus = 'volume_up';
  time = "00:00";
  paused = true;
  value = 1.0;
  disabled = false;

  constructor(public musicService: MusicPlayerService) {
    this.musicService.playbackStatus$.subscribe((status: boolean) => this.paused = status);
  }

  ngOnInit() {

  }

  seek(): void {
    const prompt = <string>window.prompt("Enter time in seconds", "");
    this.musicService.seek(parseInt(prompt));
  }

  togglePlayback(): void {
    if (this.paused) {
      this.musicService.play();
    } else {
      this.musicService.pause();
    }
  }

  toggleMute(): void {
    if (this.musicService.muteStatus) {
      this.musicService.unmute()
      this.disabled = false;
      this.muteStatus = 'volume_up';
    } else {
      this.musicService.mute();
      this.disabled = true;
      this.muteStatus = 'volume_off';
    }
  }
}
