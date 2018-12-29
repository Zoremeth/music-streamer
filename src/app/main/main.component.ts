import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { MusicPlayerService } from '../shared/player';
import { MatTableDataSource, MatSort } from '@angular/material';
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
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public musicService: MusicPlayerService) {
    if (this.musicService.isMobile) {
      this.displayedColumns = ['title', 'artist'];
      this.top = '56px';
      this.bottom = '112px';
    }
  }
  ngOnInit() {
    this.musicService.songs$.subscribe(songs => (this.songList.data = songs,
      this.songList.sort = this.sort
    ));
  }

  play(id: number): void {
    console.log(this.songList.data[id]);
    this.musicService.load(id);
    this.musicService.play();
  }

  applyFilter(filterValue: string) {
    this.songList.filter = filterValue.trim().toLowerCase();
  }
}
