// Angular import
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule, Location, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';

// project import
import { NavigationItem, NavigationItems, NavigationItemsAdmin } from '../navigation';
import { environment } from 'src/environments/environment';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NavCollapseComponent } from './nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './nav-group/nav-group.component';
import { NavItemComponent } from './nav-item/nav-item.component';

// icon
import { IconService } from '@ant-design/icons-angular';
import {
  DashboardOutline,
  CreditCardOutline,
  LoginOutline,
  QuestionOutline,
  ChromeOutline,
  FontSizeOutline,
  ProfileOutline,
  BgColorsOutline,
  AntDesignOutline,
  UserAddOutline,
  ClusterOutline,
  TeamOutline,
  GlobalOutline,
  SyncOutline,
  CloseSquareOutline,
  UserDeleteOutline,
  IssuesCloseOutline,
  InfoCircleOutline,
  ProjectOutline,
  UsergroupDeleteOutline,
  FileDoneOutline,
  CarryOutOutline,

} from '@ant-design/icons-angular/icons';
import { UtilityService } from 'src/app/shared/utility.service';

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements OnInit {
  // public props
  @Output() NavCollapsedMob: EventEmitter<string> = new EventEmitter();

  navigations: any;
  navAdmin:any
  user:any;
  // version
  title = 'Demo application for version numbering';
  currentApplicationVersion = environment.appVersion;

  navigation = NavigationItems;
  windowWidth = window.innerWidth;

  // Constructor
  constructor(
    private location: Location,
    private locationStrategy: LocationStrategy,
    private iconService: IconService,
    private cdr: ChangeDetectorRef,
    private readonly sessionService: UtilityService
    
  ) {
    this.iconService.addIcon(
      ...[
        DashboardOutline,
        CreditCardOutline,
        FontSizeOutline,
        LoginOutline,
        ProfileOutline,
        BgColorsOutline,
        AntDesignOutline,
        ChromeOutline,
        QuestionOutline,
        UserAddOutline,
        ClusterOutline,
        TeamOutline,
        GlobalOutline,
        SyncOutline,
        CloseSquareOutline,
        UserDeleteOutline,
        IssuesCloseOutline,
        InfoCircleOutline,
        ProjectOutline,
        UsergroupDeleteOutline,
        FileDoneOutline,
        CarryOutOutline,
      ]
    );
 
  }

  // Life cycle events
  ngOnInit() {
    if (this.windowWidth < 1025) {
      (document.querySelector('.coded-navbar') as HTMLDivElement).classList.add('menupos-static');
    }
    console.log('sharedData*************', this.navigations)
    this.navigations = NavigationItems;
    this.sessionService.sharedData$.subscribe(sharedData => {
      console.log('*********', sharedData);
      if(sharedData ==  'superUser') {
        this.navigations = NavigationItemsAdmin;
      } else {
        this.navigations = NavigationItems;
      }
    });
    // if(this.sessionService.getItem('user') == 'superUser') {
      this.navAdmin = NavigationItems;
    //   this.user = false;
    //   this.cdr.detectChanges();
    // } else {
    //  this.navigations = NavigationItems;
    //  this.user = true;
    // }
  }

  fireOutClick() {
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;
      if (parent?.classList.contains('coded-hasmenu')) {
        parent.classList.add('coded-trigger');
        parent.classList.add('active');
      } else if (up_parent?.classList.contains('coded-hasmenu')) {
        up_parent.classList.add('coded-trigger');
        up_parent.classList.add('active');
      } else if (last_parent?.classList.contains('coded-hasmenu')) {
        last_parent.classList.add('coded-trigger');
        last_parent.classList.add('active');
      }
    }
  }

  navMob() {
    if (this.windowWidth < 1025 && document.querySelector('app-navigation.coded-navbar').classList.contains('mob-open')) {
      this.NavCollapsedMob.emit();
    }
  }
}
