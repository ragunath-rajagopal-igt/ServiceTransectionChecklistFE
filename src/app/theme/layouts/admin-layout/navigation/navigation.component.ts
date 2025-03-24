// Angular import
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NavContentComponent } from './nav-content/nav-content.component';
import { AuthService } from 'src/app/shared/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  // media 1025 After Use Menu Open
  @Output() NavCollapsedMob = new EventEmitter();

  navCollapsedMob;
  windowWidth: number;
  organizationCode: string;
  disableOrg: boolean = false;
  mySubscription;
  orgList: any[] = [
    {
      code: "01",
      name: "Lottery (RI)"
    },
    {
      code: "1000",
      name: "Gaming (NV)"
    }
  ];

  // Constructor
  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.windowWidth = window.innerWidth;
    this.navCollapsedMob = false;
    this.organizationCode = this.authService.getOrgCode();
    this.disableOrg = this.authService.getRoleBasedOrgEnable();
    this.orgList = this.authService.getOrganization();
  }

  // public method
  navCollapseMob() {
    if (this.windowWidth < 1025) {
      this.NavCollapsedMob.emit();
    }
  }

  onOrgSelected(event: any): void {
    const orgCode = event.target.value;
    this.organizationCode = event.target.value;
    this.authService.updateOrgCode(orgCode);
    this.reLoad();
  }

  reLoad(){
    // this.router.navigate([this.router.url])
    this.router.navigateByUrl('/stc/cc', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/'])});
    }
}
