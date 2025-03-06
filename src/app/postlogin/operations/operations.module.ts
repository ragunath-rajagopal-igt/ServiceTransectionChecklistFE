import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MonthlyBarChartComponent } from 'src/app/theme/shared/components/monthly-bar-chart/monthly-bar-chart.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { DynamicformModule } from 'src/app/shared/components/dynamic-form/dynamicform.module';
import { OperationsComponent } from './default/operations.component';
import { OperationsCreateComponent } from './operations/operations-form.component';
import { OperationsRoutingModule } from './operations-routing.module';

@NgModule({
  declarations: [
    OperationsComponent,
    OperationsCreateComponent,
  ],
  imports: [CommonModule, OperationsRoutingModule, MaterialModule, SharedModule, MonthlyBarChartComponent, TableComponent, DynamicformModule],
})
export class OperationsModule {}
