import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-form-fields',
    templateUrl: 'form-fields.component.html',
    styleUrls: ['form-fields.component.scss']
})
export class FormFieldsComponent {
 @Input() formFields:any;
 @Input() form: any;
 @Output() onFieldChange = new EventEmitter();

 // Method to handle field changes
 handleFieldChange(controlName: string, selectedValue: any): void {
   console.log('selectedValue', selectedValue);
    this.onFieldChange.emit({ controlName, selectedValue }); // Emit the control name and selected value
 }

 trackByFn(index: number, item: any): any {
    return item.attributes.formControlName; // or any unique identifier for the field
 }
}
