import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MonthlyBarChartComponent } from 'src/app/theme/shared/components/monthly-bar-chart/monthly-bar-chart.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { DynamicformModule } from 'src/app/shared/components/dynamic-form/dynamicform.module';
import { ServiceManagementRoutingModule } from './service-management-routing.module';
import { ServiceManagementComponent } from './default/service-management.component';
import { ServiceManagementCreateComponent } from './service-management/service-management-form.component';

@NgModule({
  declarations: [
    ServiceManagementComponent,
    ServiceManagementCreateComponent,
  ],
  imports: [CommonModule, ServiceManagementRoutingModule, MaterialModule, SharedModule, MonthlyBarChartComponent, TableComponent, DynamicformModule],
})
export class ServiceManagementModule {}
