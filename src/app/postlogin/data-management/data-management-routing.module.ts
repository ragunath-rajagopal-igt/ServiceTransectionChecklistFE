import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataManagementComponent } from './default/data-management.component';
import { DataManagementCreateComponent } from './data-management/data-management-form.component';


const routes: Routes = [
    {
        path: '',
        component: DataManagementComponent
    },
    {
      path: 'create',
      component: DataManagementCreateComponent
    },
    {
      path:'edit/:id',
      component: DataManagementCreateComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataManagementRoutingModule {}