import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicControlService {

  constructor() { }

  getCurrentSong(): Observable<String> {
    return of('');
  }

  play(streamURL: string): void {
    const musicPlayer = <HTMLAudioElement>document.getElementById('musicplayer');
    musicPlayer.src = streamURL;
    musicPlayer.load()
    if(musicPlayer.readyState > 2) {
      //LOADS TOO FAST, STATE 0 during execution
      //Perhaps assume that it can never be 0? Would work for a private server 
      console.log('Playing.');
      musicPlayer.play();
    }
    else {
      console.log('Couldn\'t play song, error ' + musicPlayer.readyState);
    }
  }
}
