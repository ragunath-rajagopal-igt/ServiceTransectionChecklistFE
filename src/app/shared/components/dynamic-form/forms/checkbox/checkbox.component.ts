import { Component ,EventEmitter, Input, Output} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
    selector: 'app-checkbox',
    templateUrl: 'checkbox.component.html',
    styleUrls: ['checkbox.component.scss'],
})
export class CheckboxComponent {
    @Input() formVal:FormGroup;
    @Input() field:any;
    @Output() onFieldChange = new EventEmitter();
    multiple = false;

    
     // Method to handle field changes
     handleFieldChange(controlName: string, selectedValue: any): void {
        this.onFieldChange.emit({ controlName, selectedValue }); // Emit the control name and selected value
    }
}