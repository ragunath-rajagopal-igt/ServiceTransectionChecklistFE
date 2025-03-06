import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


interface Option {
    value: string;
    display: string;
}

interface FormField {
    label: string;
    controlType: string;
    attributes?: {
        formControlName: string;
        type?: string; // For input types
        placeholder?: string;
        required?: boolean;
        maxLength?: number;
        minLength?: number;
        options?: Option[]; // For select types
        class?: string;
        value?: any; // Default value
        rows?: number; // For textarea
    };
    validationMessages?: { [key: string]: string };
    onChange?: any;
    isKeyUp?: boolean;
}

@Component({
    selector: 'build-form',
    templateUrl: 'build-form.component.html',
    styleUrls: ['build-form.component.scss']
})
export class BuildFormComponent implements OnInit, OnChanges {
    form: FormGroup;
    @Output() onSubmit = new EventEmitter();
    @Input() formFields: FormField[] = [];
    @Input() showSaveButton: boolean = true;
    @Output() onSubmitFromParent = new EventEmitter();

    constructor(
        private readonly location: Location
    ) {}

    ngOnInit() {
        this.initializeForm();
    }

    //Handle Angluar Life cycle
    ngOnChanges(changes: SimpleChanges) {
        if (changes['formFields'] && !changes['formFields'].firstChange) {
            
            const newFormFields = changes['formFields'].currentValue;
            // Reset the form and reinitialize it with the new values
            this.updateForm(newFormFields);
        }
    }

    //Handle Initializa form
    initializeForm() {
        console.log("iiiiiii",this.formFields);
        const fieldsCtrls = this.createFormControls(this.formFields);
        console.log("fieldsCtrls",fieldsCtrls);
        this.form = new FormGroup(fieldsCtrls);
    }

    //Handle form control
    createFormControls(fields: FormField[]): { [key: string]: FormControl } {
        const fieldsCtrls = {};
        for (const field of fields) {
            const { attributes } = field;
            const validators = [];

            // Add required validator
            if (attributes.required) {
                validators.push(Validators.required);
            }

            
            // Add minLength validator
            if (attributes.minLength) {
                validators.push(Validators.minLength(attributes.minLength));
            }

            // Add maxLength validator
            if (attributes.maxLength) {
                validators.push(Validators.maxLength(attributes.maxLength));
            }

            // Add email validator if the type is email
            if (attributes.type === 'email') {
                validators.push(Validators.email);
            }

            // Create FormControl based on the controlType
            let defaultValue = attributes.value || '';
            if (field.controlType === 'date') {
                defaultValue = attributes.value ? new Date(attributes.value) : new Date();
            }
            if (field.controlType === 'checkbox') {
                defaultValue = attributes.value == 'true' ? true : false;
            }
            if (field.controlType === 'radio') {
                defaultValue = attributes.value == 'true' ? true : false;
            }

            // Initialize the FormControl with the default value and validators
            fieldsCtrls[attributes.formControlName] = new FormControl(defaultValue, validators);
        }
        return fieldsCtrls;
    }

    //Handle update form
    updateForm(newFormFields: FormField[]) {
        // Update the form controls based on the new form fields
        const fieldsCtrls = this.createFormControls(newFormFields);
        // Reset and update form with new controls
        this.form.reset();
        this.form = new FormGroup(fieldsCtrls);
    }

    //Handle submit data
    onSubmitData() {
        this.onSubmit.emit(this.form.getRawValue());
    }

    //Handle validate form
    validateForm() {
        this.form.markAllAsTouched();
        return this.form.valid;
    }

    //Handle submit form
    submitForm() {
       
        if (this.validateForm()) {
            this.onSubmitFromParent.emit(this.form.getRawValue());
        }
    }

    //Handle field change
    onFieldChange(controlName: string, selectedValue: any) {
        const field = this.formFields.find(f => f.attributes.formControlName === controlName);        
        if(field.controlType === 'checkbox'){
            field.attributes.value = selectedValue;
            const rest = this.form.get(controlName);
            rest.setValue(selectedValue);
        }
        const formValue = this.form.getRawValue();
        if (field && field.onChange) {
            field.onChange(selectedValue, formValue); // Trigger the onChange function from the parent component
        }
    }

    //Handle go back
    goBack() {
      this.location.back();
    }
}
