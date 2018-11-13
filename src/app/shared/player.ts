import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

const musicPlayerId = "musicPlayer";

@Injectable({
  providedIn: "root"
})
export class MusicPlayerService implements OnDestroy {
  private player: HTMLAudioElement;
  private currentTimeStream: BehaviorSubject<number>;
  private playbackStatusStream: BehaviorSubject<boolean>;
  private volumeStream: BehaviorSubject<number>;
  private sourceStream: BehaviorSubject<string>;
  private lengthStream: BehaviorSubject<number>;

  constructor() {
    this.player = this.getOrCreateAudioElement();
    this.currentTimeStream = new BehaviorSubject(this.player.currentTime);
    this.playbackStatusStream = new BehaviorSubject(this.player.paused);
    this.volumeStream = new BehaviorSubject(this.player.volume);
    this.sourceStream = new BehaviorSubject(this.player.src);
    this.lengthStream = new BehaviorSubject(this.player.duration);
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

  get playbackStatusIcon(): string {
    if (this.playbackStatusStream.value) {
      return 'play_arrow';
    } else {
      return 'pause';
    }
  }

  load(source: string) {
    this.player.src = source;
    this.sourceStream.next(this.player.src);
  }

  seek(seconds: number) {
    this.player.currentTime = seconds;
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  changeVolume(volume: number) {
    this.player.volume = volume;
  }

  toggleMute(): boolean {
    if(this.player.muted) {
      this.player.muted = false;
      return false;
    } else {
      this.player.muted = true;
      return true;
    }
  }

  private getOrCreateAudioElement() {
    const newElement = document.createElement("audio");
    newElement.id = musicPlayerId;
    document.body.appendChild(newElement);
    return newElement;
  }

  private setupPlayer() {
    this.player.addEventListener("timeupdate", this.onTimeUpdate);
    this.player.addEventListener("volumechange", this.onVolumeChange);
    this.player.addEventListener("play", this.setPlaying);
    this.player.addEventListener("pause", this.setPaused);
    this.player.addEventListener('durationchange', this.durationChange);
  }

  private teardownPlayer() {
    this.player.removeEventListener("timeupdate", this.onTimeUpdate);
    this.player.removeEventListener("volumechange", this.onVolumeChange);
    this.player.removeEventListener("play", this.setPlaying);
    this.player.removeEventListener("pause", this.setPaused);
    this.player.addEventListener('durationchange', this.durationChange);
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
