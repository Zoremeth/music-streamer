import { Component, OnInit } from '@angular/core';
import { MusicPlayerService } from '../shared/player';
import { MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

export interface Song {
  url: string;
  title: string;
  artist: string;
  album: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  songs: Song[] = [];
  displayedColumns: string[] = ['title', 'artist', 'album'];
  songList = new MatTableDataSource(this.songs);

  constructor(public musicService: MusicPlayerService) {
  }

  ngOnInit() {
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
