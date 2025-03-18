import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSettingComponent } from './admin-setting/admin-setting.component';
import { AdminSeverityComponent } from './admin-severity/admin-severity.component';
import { CreateSeverityComponent } from './admin-severity/create-severity/create-severity.component';
import { SubareaComponent } from './sub-area/subarea/subarea.component';
import { CreateSubAreaComponent } from './sub-area/create-sub-area/create-sub-area.component';
import { ItemComponent } from './item/item/item.component';
import { CreateItemComponent } from './item/create-item/create-item.component';
import { ProductNameComponent } from './product-name/productname/productname.component';
import { CreateProductNameComponent } from './product-name/create-product-name/create-product-name.component';
import { OwnerComponent } from './owner/owner/owner.component';
import { CreateOwnerComponent } from './owner/create-owner/create-owner.component';
import { StatusComponent } from './status/status/status.component';
import { CreateStatusComponent } from './status/create-status/create-status.component';


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
    {
      path: 'subarea/create',
      component: CreateSubAreaComponent
    },
    {
      path:'subarea/edit/:id',
      component: CreateSubAreaComponent
    },
    {
      path: 'item',
      component: ItemComponent
    },
    {
      path: 'item/create',
      component: CreateItemComponent
    },
    {
      path:'item/edit/:id',
      component: CreateItemComponent
    },
    {
      path: 'productname',
      component: ProductNameComponent
    },
    {
      path: 'productname/create',
      component: CreateProductNameComponent
    },
    {
      path:'productname/edit/:id',
      component: CreateProductNameComponent
    },
    {
      path: 'owner',
      component: OwnerComponent
    },
    {
      path: 'owner/create',
      component: CreateOwnerComponent
    },
    {
      path:'owner/edit/:id',
      component: CreateOwnerComponent
    },
    {
      path: 'status',
      component: StatusComponent
    },
    {
      path: 'status/create',
      component: CreateStatusComponent
    },
    {
      path:'status/edit/:id',
      component: CreateStatusComponent
    },
  ]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSettingRoutingModule {}