import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-dropdown-search',
    templateUrl: 'dropdown-search.component.html',
    styleUrls: ['dropdown-search.component.scss']
})
export class DropdownSearchComponent implements OnInit{
    @Input() formVal:FormGroup;
    @Input() field:any;
    @Output() onFieldChange = new EventEmitter();
    multiple = false;

    searchText = '';
    selectedValue: string;
    options = [];
  
    // Filtered options for search
    filteredOptions = [];
  
    filterOptions(event: any) {
      this.searchText = event.target.value;
      const searchLower = this.searchText.toLowerCase();
      const regex = new RegExp(`\\b${searchLower}`, 'i');
      // option.label.toLowerCase().includes(searchLower)
      const filterValue = this.options.filter(option =>
        option.label.toLowerCase().includes(searchLower)
      );
      this.filteredOptions = filterValue;
      console.log( this.searchText, searchLower, 'searchLower', filterValue);
    }
    
    onDropdownOpen() {
    // Optionally clear the search box when the dropdown opens
      this.searchText = '';
      if (this.field && this.field.options) {
        this.filteredOptions = [...this.field.options];
      }
    }

    ngOnInit() {
        this.checkANdDisableField();
        if (this.field && this.field.attributes && this.field.attributes.multiple) {
            this.multiple = true;
        }
        if (this.field && this.field.options) {
          this.filteredOptions = [...this.field.options];
          this.options = [...this.field.options];
        }
        if (this.field && this.field.attributes.value) {
          this.selectedValue = this.field.attributes.value;
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
