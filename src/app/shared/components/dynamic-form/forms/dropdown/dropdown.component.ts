import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-dropdown',
    templateUrl: 'dropdown.component.html',
    styleUrls: ['dropdown.component.scss']
})
export class DropdownComponent implements OnInit{
    @Input() formVal:FormGroup;
    @Input() field:any;
    @Output() onFieldChange = new EventEmitter();
    multiple = false;

    ngOnInit() {
        this.checkANdDisableField();
        if (this.field && this.field.attributes && this.field.attributes.multiple) {
            this.multiple = true;
        }
    }
    
    ngOnChanges() {
        this.checkANdDisableField();
        if (this.field && this.field.attributes && this.field.attributes.multiple) {
            this.multiple = true;
        }
    }

    //Handle Disable Field
    checkANdDisableField() {
        if (this.field.attributes.disabled && this.field.attributes.disabled === true) {
            this.formVal.get(this.field.attributes.formControlName).disable({onlySelf: true, emitEvent: true });
          } else {
            this.formVal.get(this.field.attributes.formControlName).enable();
          }
    }
    // Method to handle field changes
    handleFieldChange(controlName: string, selectedValue: any): void {
        this.onFieldChange.emit({ controlName, selectedValue }); // Emit the control name and selected value
    }
}
