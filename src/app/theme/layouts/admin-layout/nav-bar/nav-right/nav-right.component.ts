// angular import
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

// icon
import { IconService } from '@ant-design/icons-angular';
import {
  BellOutline,
  SettingOutline,
  GiftOutline,
  MessageOutline,
  PhoneOutline,
  CheckCircleOutline,
  LogoutOutline,
  EditOutline,
  UserOutline,
  ProfileOutline,
  WalletOutline,
  QuestionCircleOutline,
  LockOutline,
  CommentOutline,
  UnorderedListOutline,
  ArrowRightOutline,
  GithubOutline
} from '@ant-design/icons-angular/icons';
import { ApiService } from 'src/app/shared/api.service';
import { AuthService } from 'src/app/shared/auth.service';
import { SnackbarToastr } from 'src/app/shared/snackbar.toastr';
import { constants } from 'src/environments/constants';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  @Input() styleSelectorToggle!: boolean;
  @Output() Customize = new EventEmitter();
  windowWidth: number;
  screenFull: boolean = true;
  userDetails: any = '';
  settingShow = false;

  constructor(
    private readonly iconService: IconService,
    private readonly apiSerivce: ApiService,
    private readonly router: Router,
    private readonly snackBarToastr: SnackbarToastr,
    private readonly authService: AuthService
  ) {
    this.windowWidth = window.innerWidth;
    this.iconService.addIcon(
      ...[
        CheckCircleOutline,
        GiftOutline,
        MessageOutline,
        SettingOutline,
        PhoneOutline,
        LogoutOutline,
        UserOutline,
        EditOutline,
        ProfileOutline,
        QuestionCircleOutline,
        LockOutline,
        CommentOutline,
        UnorderedListOutline,
        ArrowRightOutline,
        BellOutline,
        GithubOutline,
        WalletOutline
      ]
    );
    const userDetails = this.authService.getUserDetails();
    
    if (userDetails && userDetails.isAdmin === false) {
      this.setting = [];
    }
    if (userDetails && userDetails.isAdmin === true) {
      this.settingShow = true;
    }
    this.userDetails = userDetails;
  }

  profile = [
    // {
    //   icon: 'user',
    //   title: 'View Profile'
    // },
  ];

  setting = [
    {
      icon: 'user',
      title: 'Account Settings'
    }
  ];

  // Method to handle logout
  onLogout() {
    this.apiSerivce.logout().subscribe({
      next: (resObj: any) => {
        if(resObj) {
          this.snackBarToastr.openSnackBar(resObj.message, false);
          this.router.navigate(['/login']);
        }
      },
      error: (data:any) => {
        const {error: erroMsg} = data;
        this.snackBarToastr.openSnackBar(erroMsg.message || constants.genericSystemMsg.error, false);
      }
    })
  }

  onAccountSettingClick = () => {
    this.router.navigate(['/stc/account-setting']);
  }
}
