import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractualComponent } from './default/contractual.component';
import { ContractualCreateComponent } from './contractual/contractual-form.component';


const routes: Routes = [
    {
        path: '',
        component: ContractualComponent
    },
    {
      path: 'create',
      component: ContractualCreateComponent
    },
    {
      path:'edit/:id',
      component: ContractualCreateComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractualRoutingModule {}