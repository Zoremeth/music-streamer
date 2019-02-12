import { Component, OnInit } from '@angular/core';
import { MusicPlayerService } from '../shared/player';
import { ThemeService } from '../shared/theme';

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
  playbackType = 'loop';
  randomizer = false;

  constructor(public musicService: MusicPlayerService, private themeService: ThemeService) {
    this.musicService.currentTime$.subscribe((seconds: number) => this.time = seconds);
    this.musicService.length$.subscribe((seconds: number) => this.max = seconds);
    this.musicService.playbackStatus$.subscribe((status: boolean) => {
      this.paused = status;
      status ? this.playbackIcon = 'play_arrow' : this.playbackIcon = 'pause';
    });
    this.musicService.randomizer$.subscribe((randomize: boolean) => this.randomizer = randomize);
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

  toggleShuffle(): void {
    if (this.randomizer) {
      this.musicService.randomizer = false;
      this.playbackType = 'loop';
    } else {
      this.musicService.randomizer = true;
      this.playbackType = 'shuffle';
    }
  }

  test(): void {
    this.themeService.setTheme('theme-red');
  }
}

