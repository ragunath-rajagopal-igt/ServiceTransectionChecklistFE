import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenrateDocComponent } from './genrate-doc.component';


const routes: Routes = [
    {
        path: '',
        component: GenrateDocComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenrateDocRoutingModule {

}
