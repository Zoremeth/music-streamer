import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from './shared/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'music-streamer';
  loginState = false;
  themeClass = 'theme-light';

  constructor(private loginService: LoginService, private overlayContainer: OverlayContainer, private themeService: ThemeService) {
    this.loginService.loggedIn$().subscribe((state: boolean) => this.loginState = state);
    themeService.theme$.subscribe((data: string) => {
      return this.themeClass = data;
    });
  }

  ngOnInit(): void {
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('theme-'));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(this.themeClass);
  }
}
