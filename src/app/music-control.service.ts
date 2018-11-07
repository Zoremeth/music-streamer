import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicControlService {

  constructor() { }

  getCurrentSong(): Observable<String> {
    return of("")
  }
}
