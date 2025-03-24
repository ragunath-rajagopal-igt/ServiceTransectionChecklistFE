import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SiteNameComponent } from '../site-name/site-name.component';


@Component({
    selector: 'post-login-home-page',
    templateUrl: 'post-login-home-page.component.html',
    styleUrls: ['post-login-home-page.component.scss']
})
export class PostLoginHomePageComponent {
// public props
navCollapsed: boolean;
navCollapsedMob: boolean;


 constructor(
      private readonly dialog: MatDialog,
    ) {
        console.log('sessionStorage.getItem', sessionStorage.getItem('siteName'));
        if(sessionStorage.getItem('siteName')  == '' || sessionStorage.getItem('siteName') == null) {
          const dialogRef = this.dialog.open(SiteNameComponent, {
            width: '800px',
            height:'300px',  // Adds a custom backdrop style (optional)
            disableClose: true,
            data: {
              title: 'Select The Site Name',
              message: 'Please submit the Site Name, then you continue the application.',
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              console.log('eee', result);
            }
          });
        }
    }



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
