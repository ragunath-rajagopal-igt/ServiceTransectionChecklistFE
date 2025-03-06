import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostLoginHomePageComponent } from './post-login-home-page/post-login-home-page.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostloginRoutingModule } from './postlogin-routing.module';
import { SharedModule } from '../theme/shared/shared.module';
import { NavBarComponent } from '../theme/layouts/admin-layout/nav-bar/nav-bar.component';
import { NavLeftComponent } from '../theme/layouts/admin-layout/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from '../theme/layouts/admin-layout/nav-bar/nav-right/nav-right.component';
import { NavigationComponent } from '../theme/layouts/admin-layout/navigation/navigation.component';
import { NavContentComponent } from '../theme/layouts/admin-layout/navigation/nav-content/nav-content.component';
import { NavCollapseComponent } from '../theme/layouts/admin-layout/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from '../theme/layouts/admin-layout/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from '../theme/layouts/admin-layout/navigation/nav-content/nav-item/nav-item.component';

@NgModule({
  declarations: [
    PostLoginHomePageComponent,
    NavBarComponent,
    NavLeftComponent, 
    NavRightComponent,
    NavigationComponent,
    NavContentComponent,
    NavCollapseComponent,
     NavGroupComponent, 
     NavItemComponent
  ],
  imports: [CommonModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    PostloginRoutingModule,
    ReactiveFormsModule 
  ],
})
export class PostloginModule {}
