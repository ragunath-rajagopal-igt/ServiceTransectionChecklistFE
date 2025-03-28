// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { GenrateDocComponent } from './genrate-doc.component';
import { GenrateDocRoutingModule } from './genrate-doc-routing.module';

import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MonthlyBarChartComponent } from 'src/app/theme/shared/components/monthly-bar-chart/monthly-bar-chart.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';

@NgModule({
    imports: [
        GenrateDocRoutingModule, MaterialModule, SharedModule, MonthlyBarChartComponent, TableComponent
    ],
    declarations: [
        GenrateDocComponent,
    ],
    exports: [
        GenrateDocComponent,
    ]
})
export class GenrateDocModule {

}
