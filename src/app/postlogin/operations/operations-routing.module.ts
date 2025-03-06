import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsComponent } from './default/operations.component';
import { OperationsCreateComponent } from './operations/operations-form.component';


const routes: Routes = [
    {
        path: '',
        component: OperationsComponent
    },
    {
      path: 'create',
      component: OperationsCreateComponent
    },
    {
      path:'edit/:id',
      component: OperationsCreateComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule {}