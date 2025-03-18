import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSettingComponent } from './admin-setting/admin-setting.component';
import { CommonModule } from '@angular/common';
import { AdminSettingRoutingModule } from './admin-setting-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { DynamicformModule } from 'src/app/shared/components/dynamic-form/dynamicform.module';
import { AdminSeverityComponent } from './admin-severity/admin-severity.component';
import { CreateSeverityComponent } from './admin-severity/create-severity/create-severity.component';
import { SubareaComponent } from './sub-area/subarea/subarea.component';
import { CreateSubAreaComponent } from './sub-area/create-sub-area/create-sub-area.component';
import { CreateItemComponent } from './item/create-item/create-item.component';
import { ItemComponent } from './item/item/item.component';
import { ProductNameComponent } from './product-name/productname/productname.component';
import { CreateProductNameComponent } from './product-name/create-product-name/create-product-name.component';
import { OwnerComponent } from './owner/owner/owner.component';
import { CreateOwnerComponent } from './owner/create-owner/create-owner.component';
import { StatusComponent } from './status/status/status.component';
import { CreateStatusComponent } from './status/create-status/create-status.component';

@NgModule({
  declarations: [
    AdminSettingComponent,
    AdminSeverityComponent,
    CreateSeverityComponent,
    SubareaComponent,
    CreateSubAreaComponent,
    ItemComponent,
    CreateItemComponent,
    ProductNameComponent,
    CreateProductNameComponent,
    OwnerComponent,
    CreateOwnerComponent,
    StatusComponent,
    CreateStatusComponent
      ],
  imports: [CommonModule, AdminSettingRoutingModule , MaterialModule, SharedModule, TableComponent, DynamicformModule],
})

export class AdminRoutingModule {}