// Angular Imports
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuildFormComponent } from './build-form/build-form.component';
import { FormFieldsComponent } from './form-fields/form-fields.component';
import { InputComponent } from './forms/input/input.component';
import { CheckboxComponent } from './forms/checkbox/checkbox.component';
import { RadioComponent } from './forms/radio/radio.component';
import { DropdownComponent } from './forms/dropdown/dropdown.component';
import { MaterialModule } from '../../material.module';
import { TextareaComponent } from './forms/textarea/textarea.component';
import { DatepickerComponent } from './forms/datepicker/datepicker.component';
import { FileuploadComponent } from './forms/fileupload/fileupload.component';
import { DropdownSearchComponent } from './forms/dropdown-search/dropdown-search.component';
import { timeComponent } from './forms/time/time.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        NgxMatTimepickerModule
    ],
    declarations: [
        BuildFormComponent,
        FormFieldsComponent,
        InputComponent,
        CheckboxComponent,
        RadioComponent,
        DropdownComponent,
        TextareaComponent,
        DatepickerComponent,
        FileuploadComponent,
        DropdownSearchComponent,
        timeComponent
    ],
    exports: [
        BuildFormComponent
    ]
})
export class DynamicformModule {

}
