import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloginRoutingModule } from './prelogin-routing.module';
import { HomepagePreloginComponent } from './homepage-prelogin/homepage-prelogin.component';
import LoginComponent from './login/login.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAccountComponent } from './create-account/create-account.component';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [
    HomepagePreloginComponent,
    LoginComponent,
    CreateAccountComponent
  ],
  imports: [
    CommonModule,
    PreloginRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
],
})
export class PreloginModule {}
