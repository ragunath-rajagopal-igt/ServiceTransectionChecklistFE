import { Component,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { SnackbarToastr } from 'src/app/shared/snackbar.toastr';
import { constants } from 'src/environments/constants';
import { ROUTE_URL } from 'src/environments/route.constants';

@Component({
    selector: 'operations',
    templateUrl: 'operations-form.component.html',
    styleUrls: ['operations-form.component.scss']
})
export class OperationsCreateComponent {

  public activeView:any = 'Create New';
  public paramId:any;
  public formValue:any='';
  constructor(
    private readonly fb: FormBuilder,
    private readonly router:Router,
    private readonly actRoute: ActivatedRoute,
    private readonly apiSer: ApiService,
    private readonly snackBarToastr: SnackbarToastr,
  ) {
  
  }
  ngOnInit() {
    this.actRoute.paramMap.subscribe(params => {
      if(params.get('id')) {
        this.activeView = 'Edit';
        this.paramId = params.get('id');
        this.loadFormFields({id:params.get('id')});
      } else {
        this.loadFormFields({});
      }
    });
    
  }

  //Load Form Fields
  loadFormFields(inputData: any): void {
    const dataParam = {
      ...inputData
    };
    this.apiSer.getGeneratedHireFields(dataParam).subscribe(
      (response) => {
        const formFieldData = response?.data?.formData || [];
        this.formValue = formFieldData;

        this.formValue = formFieldData.map(field => {
          if (field.attributes.formControlName === 'hclSapNo') {
            return {
              ...field,
              isKeyUp: true,
              onChange: (selectedValue: any, formValues: any) => this.onFieldChange('hclSapNo', selectedValue, formValues)
            };
          }
          return field;
        });
      },
      (error) => {
        const { error: errorData } = error || {};
        this.snackBarToastr.openSnackBar(errorData?.message || constants.genericSystemMsg.error, true);
      }
    );
  }

  //Update Form Values
  updateFormValues(resObj) {
    const formFieldData = resObj?.data?.renderData;
    this.formValue = formFieldData.map(field => {
      if (field.attributes.formControlName === 'hclSapNo') {
        return {
          ...field,
          isKeyUp: true,
          onChange: (selectedValue: any, formValues: any) => this.onFieldChange('hclSapNo', selectedValue, formValues)
        };
      }
      return field;
    });
  }

  //Call Api Methods
  dataSave(event:any) {
    if(this.activeView == 'Edit') {
      this.updateFormValue(event)
    } else {
      this.saveFormValue(event)
    }
  }

  
  //Field Change
  onFieldChange(controlName: string, value: any, formValues: any = {}) {
    const selectedValue = value;
    if (controlName === 'hclSapNo') {
      if(this.paramId) {
        this.loadFormFields({...formValues, id: this.paramId});
      } else {
        this.loadFormFields(formValues);
      }
    }
  }

  //Update Api cal
  updateFormValue(event) {
    event._id= this.paramId;
    this.apiSer.updateHireData(event).subscribe({
      next: (resObj: any) => {
        if(resObj) {
          this.snackBarToastr.openSnackBar(resObj?.message || constants.genericSystemMsg.update, false);
          this.router.navigate([ROUTE_URL.contractual.default]); 
        }
      },
      error: (data:any) => {
        const { error } = data || {};
        this.snackBarToastr.openSnackBar(error?.message || constants.genericSystemMsg.error, true);
      }
    })
   } 

   //Create Api Cal
 saveFormValue(event) {
  this.apiSer.saveNewHireData(event).subscribe({
    next: (resObj: any) => {
      if(resObj) {       
        this.snackBarToastr.openSnackBar(resObj?.message || constants.genericSystemMsg.create, false);
        this.router.navigate([ROUTE_URL.contractual.default]);
      }
    },
    error: (data:any) => {
      const { error } = data || {};
      this.snackBarToastr.openSnackBar(error?.message || constants.genericSystemMsg.error, true);
    }
  })
 } 

}
