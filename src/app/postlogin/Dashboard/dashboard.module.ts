import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DefaultComponent } from './dashboard/dashboard.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MonthlyBarChartComponent } from 'src/app/theme/shared/components/monthly-bar-chart/monthly-bar-chart.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';

@NgModule({
  declarations: [
    DefaultComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, MaterialModule, SharedModule, MonthlyBarChartComponent, TableComponent],
})
export class DashboardModule {}
