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
        this.generateOperationsForm({id:params.get('id')});
      } else {
        this.generateOperationsForm({});
      }
    });
    
  }

  //Load Form Fields
  generateOperationsForm(formData:any){
    this.apiSer.getGeneratedOperationsFields(formData).subscribe({
        next: (resObj: any) => {
          if(resObj) {       
            const formFieldData = resObj?.renderData;
            this.formValue = formFieldData;
        }
    },
    error: (data:any) => {
      return data;
    }
  })
  }


  //Call Api Methods
  dataSave(event:any) {
    if(this.activeView == 'Edit') {
      this.updateFormValue(event)
    } else {
      this.saveFormValue(event)
    }
  }


  //Update Api cal
  updateFormValue(event) {
    event._id= this.paramId;
    this.apiSer.updateOperationsData(event).subscribe({
      next: (resObj: any) => {
        if(resObj) {
          this.snackBarToastr.openSnackBar(resObj?.message || constants.genericSystemMsg.update, false);
          this.router.navigate([ROUTE_URL.operations.default]); 
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
  this.apiSer.saveOperationsData(event).subscribe({
    next: (resObj: any) => {
      if(resObj) {       
        this.snackBarToastr.openSnackBar(resObj?.message || constants.genericSystemMsg.create, false);
        this.router.navigate([ROUTE_URL.operations.default]);
      }
    },
    error: (data:any) => {
      const { error } = data || {};
      this.snackBarToastr.openSnackBar(error?.message || constants.genericSystemMsg.error, true);
    }
  })
 } 

}
