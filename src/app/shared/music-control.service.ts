import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicControlService {

  playerStatusIcon = 'play_arrow';

  constructor() {}

  getCurrentSong(): Observable < String > {
    return of('');
  }

  play(streamURL: string): void {
    const musicPlayer = < HTMLAudioElement > document.getElementById('musicplayer');
    musicPlayer.src = streamURL;
    musicPlayer.load(),
    // Skip checking for availability? Because it's a private server? Do check later? If player hasnt started
      setTimeout(() => {
        if (musicPlayer.readyState > 2) {
          console.log('Playing.');
          musicPlayer.play();
        } else {
          console.log('Couldn\'t play song, error ' + musicPlayer.readyState);
        }
      }, 2500);
  }

  getStatus(): string {
    const musicPlayer = < HTMLAudioElement > document.getElementById('musicplayer');
    if(musicPlayer.paused) {
      this.playerStatusIcon = 'play_arrow';
    } else {
      this.playerStatusIcon = 'pause';
    }
    return this.playerStatusIcon;
  }
}