import { Component ,EventEmitter, Input, Output} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-radio',
    templateUrl: 'radio.component.html',
    styleUrls: ['radio.component.scss']
})
export class RadioComponent {
    @Input() formVal:FormGroup;
    @Input() field:any;
    @Output() onFieldChange = new EventEmitter();

     // Method to handle field changes
     handleFieldChange(controlName: string, selectedValue: any): void {
        this.onFieldChange.emit({ controlName, selectedValue }); // Emit the control name and selected value
    }
}
