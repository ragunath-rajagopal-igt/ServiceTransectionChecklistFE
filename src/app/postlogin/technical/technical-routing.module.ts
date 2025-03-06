import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnicalComponent } from './default/technical.component';
import { TechnicalCreateComponent } from './technical/technical-form.component';


const routes: Routes = [
    {
        path: '',
        component: TechnicalComponent
    },
    {
      path: 'create',
      component: TechnicalCreateComponent
    },
    {
      path:'edit/:id',
      component: TechnicalCreateComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicalRoutingModule {}