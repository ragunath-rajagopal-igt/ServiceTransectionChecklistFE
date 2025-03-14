import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSettingComponent } from './admin-setting/admin-setting.component';
import { AdminSeverityComponent } from './admin-severity/admin-severity.component';
import { CreateSeverityComponent } from './admin-severity/create-severity/create-severity.component';
import { SubareaComponent } from './sub-area/subarea/subarea.component';


const routes: Routes = [
    {
        path: '',
        component: AdminSettingComponent
    },
    {
      path: 'severity',
      component: AdminSeverityComponent
    },
    {
      path: 'create',
      component: CreateSeverityComponent
    },
    {
      path:'edit/:id',
      component: CreateSeverityComponent
    },
    {
      path: 'subarea',
      component: SubareaComponent
    },
  ]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSettingRoutingModule {}