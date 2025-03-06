import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MonthlyBarChartComponent } from 'src/app/theme/shared/components/monthly-bar-chart/monthly-bar-chart.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { DynamicformModule } from 'src/app/shared/components/dynamic-form/dynamicform.module';
import { DataManagementRoutingModule } from './data-management-routing.module';
import { DataManagementComponent } from './default/data-management.component';
import { DataManagementCreateComponent } from './data-management/data-management-form.component';

@NgModule({
  declarations: [
    DataManagementComponent,
    DataManagementCreateComponent,
  ],
  imports: [CommonModule, DataManagementRoutingModule, MaterialModule, SharedModule, MonthlyBarChartComponent, TableComponent, DynamicformModule],
})
export class DataManagementModule {}
