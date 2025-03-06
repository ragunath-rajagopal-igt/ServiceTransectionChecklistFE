// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { NotFoundComponent } from './shared/components/not-found-page/not-found.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full',
  },
  {
    path:'login', 
    loadChildren: () => import('./prelogin/prelogin.module').then(m => m.PreloginModule)
  },
  {
    path:'stc', 
    loadChildren: () => import('./postlogin/postlogin.module').then(m => m.PostloginModule),
    canActivate: [AuthGuard] 
  },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
