import { Component, OnInit, HostBinding } from '@angular/core';
import { MusicPlayerService } from '../shared/player';
import { MatTableDataSource } from '@angular/material';
import { Song } from '../shared/song';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  displayedColumns: string[] = ['title', 'artist', 'album'];
  songList = new MatTableDataSource<Song>();
  mainContent = 'song-list';
  @HostBinding('style.top') top = '64px';
  @HostBinding('style.bottom') bottom = '64px';

  constructor(public musicService: MusicPlayerService) {
    if (this.musicService.isMobile) {
      this.displayedColumns = ['title', 'artist'];
      this.top = '56px';
      this.bottom = '112px';
    }
  }

  ngOnInit() {
    this.musicService.songs$.subscribe(songs => (this.songList.data = songs));
  }

  isOddOrEven(i: number): string {
    if (i % 2 === 0) {
      return 'tr-1';
    } else {
      return 'tr-2';
    }
  }

  play(index: number): void {
    this.musicService.load(index);
    this.musicService.play();
  }

  applyFilter(filterValue: string) {
    this.songList.filter = filterValue.trim().toLowerCase();
  }
}
