import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterLinkWithHref,
    RouterLinkActive,
    SearchComponent,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  hideSideMenu = signal(true);
  showMenu = signal(false);


  toogleSideMenu() {
    this.hideSideMenu.update((prevState) => !prevState);
  }

  toggleMenu() {
    this.showMenu.update((prevState) => !prevState);
  }
}
