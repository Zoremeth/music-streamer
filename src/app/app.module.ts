import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopnavComponent } from './topnav/topnav.component';
import { MainComponent } from './main/main.component';
import { BottomnavComponent } from './bottomnav/bottomnav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { SeekPipe } from './shared/seekpipe';
import { HttpClientModule } from '@angular/common/http';
import { MusicPlayerService } from './shared/player';

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    MainComponent,
    BottomnavComponent,
    SeekPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [MusicPlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
