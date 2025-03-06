import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepagePreloginComponent } from './homepage-prelogin/homepage-prelogin.component';
import { CreateAccountComponent } from './create-account/create-account.component';

const routes1: Routes = [ 
  
  {
    path: '',
    component: HomepagePreloginComponent
  },
  {
    path: 'forgot-password',
    component: CreateAccountComponent
  },
  {
    path: 'update-password',
    component: CreateAccountComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes1)],
  exports: [RouterModule]
})
export class PreloginRoutingModule { }
