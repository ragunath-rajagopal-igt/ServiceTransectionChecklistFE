import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceManagementComponent } from './default/service-management.component';
import { ServiceManagementCreateComponent } from './service-management/service-management-form.component';


const routes: Routes = [
    {
        path: '',
        component: ServiceManagementComponent
    },
    {
      path: 'create',
      component: ServiceManagementCreateComponent
    },
    {
      path:'edit/:id',
      component: ServiceManagementCreateComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceManagementRoutingModule {}