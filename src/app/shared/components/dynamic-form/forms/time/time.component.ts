import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-time',
    templateUrl: 'time.component.html',
    styleUrls: ['time.component.scss']
})
export class timeComponent {
   @Output() onFieldChange = new EventEmitter();
    @Input() formVal:FormGroup;
    @Input() field:any;
    @ViewChild('timepicker') timepicker1: any;

    openFromIcon(timepicker: { open: () => void }) {
        if (!this.formVal.disabled) {
          timepicker.open();
        }
      }

      handleFieldChange(controlName: string, selectedValue: any): void {
        console.log(controlName, 'time', selectedValue);
        console.log('timepicker', this.timepicker1)
        if (!this.field.isKeyUp) { // avoid calling twice if isKeyUp is enabled
            this.onFieldChange.emit({ controlName, selectedValue }); // Emit the control name and selected value
        }
    }

}
