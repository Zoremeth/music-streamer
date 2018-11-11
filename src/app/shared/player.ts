import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

const musicPlayerId = "musicPlayer";

@Injectable({
  providedIn: "root"
})
export class MusicPlayerService implements OnInit, OnDestroy {
  private player: HTMLAudioElement;
  private currentTimeStream: BehaviorSubject<number>;
  private playbackStatusStream: BehaviorSubject<boolean>;
  private volumeStream: BehaviorSubject<number>;
  private sourceStream: BehaviorSubject<string>;

  constructor() {
    this.player = this.getOrCreateAudioElement();
    this.currentTimeStream = new BehaviorSubject(this.player.currentTime);
    this.playbackStatusStream = new BehaviorSubject(
      this.player.paused ? true : false
    );
    this.volumeStream = new BehaviorSubject(this.player.volume);
    this.sourceStream = new BehaviorSubject(this.player.src);
  }

  ngOnInit() {
    this.setupPlayer();
  }

  ngOnDestroy() {
    this.teardownPlayer();
  }

  get currentTime$() {
    return this.currentTimeStream.asObservable();
  }

  get currentTime2() {
    return this.currentTimeStream.value;
  }

  get playbackStatus$() {
    return this.playbackStatusStream.asObservable();
  }

  get volume$() {
    return this.volumeStream.asObservable();
  }

  get muteStatus() {
    return this.player.muted;
  }

  get source$() {
    return this.sourceStream.asObservable();
  }

  get playbackStatusIcon(): string {
    if (this.playbackStatusStream.value) {
      return 'play_arrow';
    } else {
      return 'pause';
    }
  }

  get length(): number {
    return this.player.duration;
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
    this.playbackStatusStream.next(false);
  }

  pause() {
    this.player.pause();
    this.playbackStatusStream.next(true);
  }

  mute() {
    this.player.muted = true;
  }

  unmute() {
    this.player.muted = false;
  }

  changeVolume(volume: number) {
    this.player.volume = volume;
  }

  private getOrCreateAudioElement() {
    const element = document.getElementById(musicPlayerId) as HTMLAudioElement;
    return element || document.body.appendChild(document.createElement("audio"));
  }

  private setupPlayer() {
    this.player.addEventListener("timeupdate", this.onTimeUpdate);
    this.player.addEventListener("volumechange", this.onVolumeChange);
    this.player.addEventListener("play", this.setPlaying);
    this.player.addEventListener("pause", this.setPaused);
  }

  private teardownPlayer() {
    this.player.removeEventListener("timeupdate", this.onTimeUpdate);
    this.player.removeEventListener("volumechange", this.onVolumeChange);
    this.player.removeEventListener("play", this.setPlaying);
    this.player.removeEventListener("pause", this.setPaused);
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
}

