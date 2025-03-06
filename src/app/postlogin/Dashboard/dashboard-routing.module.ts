import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './dashboard/dashboard.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';

const routes: Routes = [
    {
        path: '',
        component: DefaultComponent
    },
    {
      path: 'table',
      component: TableComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}