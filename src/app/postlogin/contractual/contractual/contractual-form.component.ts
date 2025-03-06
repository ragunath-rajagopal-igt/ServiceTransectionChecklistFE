import { Component,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { SnackbarToastr } from 'src/app/shared/snackbar.toastr';
import { constants } from 'src/environments/constants';
import { ROUTE_URL } from 'src/environments/route.constants';

@Component({
    selector: 'contractual',
    templateUrl: 'contractual-form.component.html',
    styleUrls: ['contractual-form.component.scss']
})
export class ContractualCreateComponent {

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
        this.generateConstructuralForm({id:params.get('id')});
      } else {
        this.generateConstructuralForm({});
      }
    });
    
  }

  //Load Form Fields
  generateConstructuralForm(formData:any){
    this.apiSer.getGeneratedConstructuralFields(formData).subscribe({
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
    this.apiSer.updateContructuralData(event).subscribe({
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
  this.apiSer.saveContructuralData(event).subscribe({
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
