import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-datepicker',
    templateUrl: 'datepicker.component.html',
    styleUrls: ['datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
    @Input() formVal:FormGroup;
    @Input() field:any;
    // readonly joingDate = new FormControl(new Date('2020,1,24'));

    ngOnInit() {
      this.checkANdDisableField();
    }
    
    ngOnChanges() {
        this.checkANdDisableField();
    }

    //Handle Disable Field
    checkANdDisableField() {
        if (this.field.attributes.disabled && this.field.attributes.disabled === true) {
            this.formVal.get(this.field.attributes.formControlName).disable({onlySelf: true, emitEvent: true });
          } else {
            this.formVal.get(this.field.attributes.formControlName).enable();
          }
    }
    //Handle only number
    allowOnlyNumbers(event: KeyboardEvent): void {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode < 48 || charCode > 57) {
          event.preventDefault();
        }
      }
      
      //Handle Format Input
    formatInput(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        let value = inputElement.value;
        value = value
        .replace(/\D/g, '') // Remove non-digit characters
        .replace(/^(\d{2})(\d)/, '$1/$2') // Add slash after 2nd digit
        .replace(/^(\/?\d{2}\/\d{2})(\d)/, '$1/$2');   
        inputElement.value = value;
    }
}
