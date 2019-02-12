import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themeStream: BehaviorSubject<string>;

  constructor() {
    this.themeStream = new BehaviorSubject('theme-blue');
  }

  get theme$() {
    return this.themeStream.asObservable();
  }

  setTheme(test: string): void {
    this.themeStream.next(test);
  }

}
