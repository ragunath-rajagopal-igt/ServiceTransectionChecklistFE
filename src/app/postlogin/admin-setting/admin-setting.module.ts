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

@NgModule({
  declarations: [
    AdminSettingComponent,
    AdminSeverityComponent,
    CreateSeverityComponent,
    SubareaComponent
      ],
  imports: [CommonModule, AdminSettingRoutingModule , MaterialModule, SharedModule, TableComponent, DynamicformModule],
})

export class AdminRoutingModule {}