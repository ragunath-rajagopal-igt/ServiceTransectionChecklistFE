import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

@Component({
    selector: 'app-input',
    templateUrl: 'input.component.html',
    styleUrls: ['input.component.scss']
})
export class InputComponent implements OnInit, OnChanges  {
    @Input() formVal:FormGroup;
    @Input() field:any;
    @Output() onFieldChange = new EventEmitter();
    public hiddenData:any;

    userInputChanged: Subject<{ controlName: string, value: string }> = new Subject();

    constructor(private cdr: ChangeDetectorRef) {
        // Listen to changes and debounce them
        this.userInputChanged.pipe(
            debounceTime(1000) // 300ms debounce time
        ).subscribe(({ controlName, value }) => {
            this.onUserStoppedTyping(controlName, value);
        });
    }

    ngOnInit() {
        this.checkANdDisableField();
    }
    
    ngOnChanges() {
        this.checkANdDisableField();
    }

    //Handle Disable Field
    checkANdDisableField() {
        if (this.field.attributes.disabled && this.field.attributes.disabled === true) {
            this.formVal.get(this.field.attributes.formControlName).disable();
          } else {
            this.formVal.get(this.field.attributes.formControlName).enable();
          }
    }
    
    // Function to be called once the user stops typing
    onUserStoppedTyping(controlName: string, value: string) {
        if (this.field.isKeyUp) {
            this.onFieldChange.emit({ controlName, selectedValue: value });
        }
    }

    //Handle Input Control
    onInput(controlName: string, value: string) {
        let currentValue = value;
        if (this.field.attributes.type === 'number') {
            currentValue = value.replace(/[^0-9]/g, '');
            this.formVal.get(controlName)?.setValue(currentValue);
        }
        this.userInputChanged.next({ controlName, value: currentValue });
        this.cdr.detectChanges();
    }

    // Method to handle field changes
    handleFieldChange(controlName: string, selectedValue: any): void {
        if (!this.field.isKeyUp) { // avoid calling twice if isKeyUp is enabled
            this.onFieldChange.emit({ controlName, selectedValue }); // Emit the control name and selected value
        }
    }
}
