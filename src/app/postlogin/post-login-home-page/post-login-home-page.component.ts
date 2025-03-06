import { Component } from '@angular/core';

@Component({
    selector: 'post-login-home-page',
    templateUrl: 'post-login-home-page.component.html',
    styleUrls: ['post-login-home-page.component.scss']
})
export class PostLoginHomePageComponent {
// public props
navCollapsed: boolean;
navCollapsedMob: boolean;

// public method
navMobClick() {
  if (this.navCollapsedMob && !document.querySelector('app-navigation.pc-sidebar')?.classList.contains('mob-open')) {
    this.navCollapsedMob = !this.navCollapsedMob;
    setTimeout(() => {
      this.navCollapsedMob = !this.navCollapsedMob;
    }, 100);
  } else {
    this.navCollapsedMob = !this.navCollapsedMob;
  }
  if (document.querySelector('app-navigation.pc-sidebar')?.classList.contains('navbar-collapsed')) {
    document.querySelector('app-navigation.pc-sidebar')?.classList.remove('navbar-collapsed');
  }
}

//Handle KeyDown
handleKeyDown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    this.closeMenu();
  }
}

//Handle Close Menu
closeMenu() {
  if (document.querySelector('app-navigation.pc-sidebar')?.classList.contains('mob-open')) {
    document.querySelector('app-navigation.pc-sidebar')?.classList.remove('mob-open');
  }
}
}
