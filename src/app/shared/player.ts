import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const musicPlayerId = 'musicPlayer';
const url = 'http://localhost/music/songs.json';

export interface Song {
  url: string;
  title: string;
  artist: string;
  album: string;
}

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService implements OnDestroy {
  private player: HTMLAudioElement;
  private currentTimeStream: BehaviorSubject<number>;
  private playbackStatusStream: BehaviorSubject<boolean>;
  private volumeStream: BehaviorSubject<number>;
  private sourceStream: BehaviorSubject<string>;
  private lengthStream: BehaviorSubject<number>;
  private queueStream: BehaviorSubject<number>;
  private songlist: Song[] = [];

  constructor(private http: HttpClient) {
    this.player = this.getOrCreateAudioElement();
    this.currentTimeStream = new BehaviorSubject(this.player.currentTime);
    this.playbackStatusStream = new BehaviorSubject(this.player.paused);
    this.volumeStream = new BehaviorSubject(this.player.volume);
    this.sourceStream = new BehaviorSubject(this.player.src);
    this.lengthStream = new BehaviorSubject(this.player.duration);
    this.queueStream = new BehaviorSubject(0);
    this.http.get<Song[]>(url).subscribe((songs: Song[]) => {
      this.songlist = songs;
    });
    this.setupPlayer();
  }

  ngOnDestroy() {
    this.teardownPlayer();
  }
  
  get currentTime$() {
    return this.currentTimeStream.asObservable();
  }

  get playbackStatus$() {
    return this.playbackStatusStream.asObservable();
  }

  get volume$() {
    return this.volumeStream.asObservable();
  }

  get source$() {
    return this.sourceStream.asObservable();
  }

  get length$() {
    return this.lengthStream.asObservable();
  }

  get songs() {
    return this.songlist;
  }

  load(index: number) {
    this.queueStream.next(index);
  }

  seek(seconds: number) {
    this.player.currentTime = seconds;
  }

  play() {
    this.player.src = this.songs[this.queueStream.value].url;
    this.player.play();
  }

  resume() { 
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  changeVolume(volume: number) {
    this.player.volume = volume;
  }

  toggleMute(): boolean {
    if (this.player.muted) {
      this.player.muted = false;
      return false;
    } else {
      this.player.muted = true;
      return true;
    }
  }

  private getOrCreateAudioElement() {
    const newElement = document.createElement('audio');
    newElement.id = musicPlayerId;
    document.body.appendChild(newElement);
    return newElement;
  }

  private setupPlayer() {
    this.player.addEventListener('timeupdate', this.onTimeUpdate);
    this.player.addEventListener('volumechange', this.onVolumeChange);
    this.player.addEventListener('play', this.setPlaying);
    this.player.addEventListener('pause', this.setPaused);
    this.player.addEventListener('durationchange', this.durationChange);
    this.player.addEventListener('ended', this.nextSong);
  }

  private teardownPlayer() {
    this.player.removeEventListener('timeupdate', this.onTimeUpdate);
    this.player.removeEventListener('volumechange', this.onVolumeChange);
    this.player.removeEventListener('play', this.setPlaying);
    this.player.removeEventListener('pause', this.setPaused);
    this.player.removeEventListener('durationchange', this.durationChange);
    this.player.removeEventListener('ended', this.nextSong);

  }

  private nextSong() {
    console.log(this.queueStream.value);
    this.load((this.index + 1));
    this.play();
  }

  private onTimeUpdate = (event: Event) => {
    if (event.target) {
      this.updateCurrentTime(this.asAudioTarget(event.target).currentTime);
    }
  }

  private onVolumeChange = (event: Event) => {
    if (event.target) {
      this.updateVolume(this.asAudioTarget(event.target).volume);
    }
  }

  private updateCurrentTime = (value: number) => this.currentTimeStream.next(value);
  private updateVolume = (value: number) => this.volumeStream.next(value);
  private setPlaying = () => this.playbackStatusStream.next(false);
  private setPaused = () => this.playbackStatusStream.next(true);
  private asAudioTarget = (target: EventTarget) => target as HTMLAudioElement;
  private durationChange = () => this.lengthStream.next(this.player.duration);
}
