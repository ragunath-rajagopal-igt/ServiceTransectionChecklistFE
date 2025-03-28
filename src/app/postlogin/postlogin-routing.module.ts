import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostLoginHomePageComponent } from './post-login-home-page/post-login-home-page.component';
import { AdminGuard } from '../shared/admin.guard';


const routes: Routes = [
    {
    path: '',
    component: PostLoginHomePageComponent,
    children: [
      {
       path:'dashboard',
       loadChildren: () => import('./Dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path:'contractual',
        loadChildren: () => import('./contractual/contractual.module').then(m => m.ContractualModule)
      },
      {
        path:'data-management',
        loadChildren: () => import('./data-management/data-management.module').then(m => m.DataManagementModule)
      },
      {
        path:'operations',
        loadChildren: () => import('./operations/operations.module').then(m => m.OperationsModule)
      },
      {
        path:'service-management',
        loadChildren: () => import('./service-management/service-management.module').then(m => m.ServiceManagementModule)
      },
      {
        path:'technical',
        loadChildren: () => import('./technical/technical.module').then(m => m.TechnicalModule)
       },
       {
        path:'admin-setting',
        loadChildren: () => import('./admin-setting/admin-setting.module').then(m => m.AdminRoutingModule)
       },
       {
        path:'gendoc',
        loadChildren: () => import('./genrate-doc/genrate-doc.module').then(m => m.GenrateDocModule)
       },
       
      //  {
      //   path:'test',
      //   loadChildren: () => import('./test/test.module').then(m => m.TestModule)
      //  },
      // {
      //   path:'network-setup',
      //   loadChildren: () => import('./network-setup/network-setup.module').then(m => m.NetworkSetupModule)
      // },
      // {
      //   path:'hire',
      //   loadChildren: () => import('./hire/hire.module').then(m => m.HireModule)
      // },
      // {
      //   path:'location-transfer',
      //   loadChildren: () => import('./location-transfer/location-transfer.module').then(m => m.LocationTransferModule)
      // },
      // {
      //   path:'short',
      //   loadChildren: () => import('./short-trip/short-trip.module').then(m => m.ShortTripModule)
      // },
      // {
      //   path:'terminate',
      //   loadChildren: () => import('./terminate/terminate.module').then(m => m.TerminateModule)
      // },
      // {
      //   path:'inactivate',
      //   loadChildren: () => import('./inactivate/inactivate.module').then(m => m.InactivateModule)
      // },
      // {
      //   path:'re-activate',
      //   loadChildren: () => import('./re-activate/re-activate.module').then(m => m.ReactivateModule)
      // },
      // {
      //   path:'project-movement',
      //   loadChildren: () => import('./project-movement/project-movement.module').then(m => m.ProjectMovementModule)
      // },
      // {
      //   path:'generate-activity',
      //   loadChildren: () => import('./generate-activity/generate-activity.module').then(m => m.GenerateActivityModule)
      // },
      // {
      //   path:'reports',
      //   loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
      // },
      // {
      //   path:'account-setting',
      //   canActivate: [AdminGuard],
      //   loadChildren: () => import('./account-setting/account-setting.module').then(m => m.AccountSettingModule)
      // }
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostloginRoutingModule {}
