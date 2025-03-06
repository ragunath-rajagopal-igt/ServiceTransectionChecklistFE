// angular import
import { Component,inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { constants } from 'src/environments/constants';
import { AuthService } from 'src/app/shared/auth.service';
import { SnackbarToastr } from 'src/app/shared/snackbar.toastr';
import { ROUTE_URL } from 'src/environments/route.constants';
import { UtilityService } from 'src/app/shared/utility.service';
@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss'],
})
export class OperationsComponent {

  currentUserRolePMOAccess: boolean = true;
  dataSource: any[] = []; // Initialize as an empty array
  loading: boolean = true; // Loading state
  errorMessage: string | null = null; // For error handling
  selectedRows: any[] = []; // Array to hold selected rows
  
  // Define table columns
  tableColumn = [
    { header: 'HCL SAP No', columnDef: 'hclSapNo' },
    { header: 'HCL Booking Manager', columnDef: 'hclBookingManager' },
    { header: 'IGT Project Manager', columnDef: 'igtProjectManager' },
    { header: 'IGT Time Approver', columnDef: 'igtTimeApprover1' },
    { header: 'Primary Role', columnDef: 'primaryRole' },
    { header: 'Project To Charge', columnDef: 'projectToCharge' },
    { header: 'Effective Date', columnDef: 'effectiveDate', field: { type: 'date', format: 'MM/dd/YYYY' } },
    { header: 'Status', columnDef: 'status', field: { type: 'options', options: constants.statusOption } },
    { header: 'Created By', columnDef: 'createdByName' },
  ];

  actions = [
    {
      action: 'edit',
      label: 'Edit',
      icon: { name: 'edit', color: ''},
      show: true,
      statusCheckIncludes: [ constants.status.created, constants.status.referred_back ],
      onClickFunc: (selectedRow: any) => this.onEdit(selectedRow)
    },
    {
      action: 'delete',
      label: 'Delete',
      icon: { name: 'delete', color: 'warn'},
      show: true,
      statusCheckIncludes: [ constants.status.created, constants.status.referred_back ],
      onClickFunc: (selectedRow: any) => this.onDelete(selectedRow)
    },
    {
      action: 'status_submit',
      label: 'Submit for approval',
      icon: { name: 'send', color: ''},
      show: true,
      statusCheckIncludes: [ constants.status.created, constants.status.referred_back ],
      onClickFunc: (selectedRow: any) => this.onSubmitForApproval(selectedRow, constants.status.submitted)
    },
    {
      action: 'status_approve',
      label: 'Approve record',
      icon: { name: 'grading', color: ''},
      show: true,
      statusCheckIncludes: [ constants.status.created, constants.status.submitted, constants.status.referred_back ],
      onClickFunc: (selectedRow: any) => this.onSubmitForApproval(selectedRow, constants.status.approved)
    },
    {
      action: 'status_refer_back_to_initiator',
      label: 'Refer back to initiator',
      icon: { name: 'undo', color: ''},
      show: true,
      statusCheckIncludes: [ constants.status.submitted, constants.status.approved ],
      onClickFunc: (selectedRow: any) => this.onSubmitForApproval(selectedRow, constants.status.referred_back)
    },
    {
      action: 'download',
      label: 'Download File',
      icon: { name: 'vertical_align_bottom', color: ''},
      show: true,
      onClickFunc: (selectedRow: any) => this.DownloadFile(selectedRow)
    }
  ];
  


  constructor(
    private readonly router:Router,
    private readonly apiSer:ApiService,
    private readonly dialog: MatDialog,
    private readonly authService: AuthService,
    private readonly snackBarToastr: SnackbarToastr,
    private utilityService: UtilityService,
  ) {
    this.currentUserRolePMOAccess = authService.getUserRoleIsPMO();
  }

  ngOnInit() {
    this.fetchHireData();
  }

  //Get Hire Data
  fetchHireData() {
    this.apiSer.getHireData().subscribe({
      next: (response) => {
        const { data: dataList } = response;
        this.dataSource = dataList?.list || [];
        this.loading = false; // Data is loaded
      },
      error: (error) => {
        this.loading = false; // Stop loading
        const { message: errorMessage } = error;
        this.errorMessage = errorMessage; // Set error message for display
      }
    });
  }

  // Handle row selection change
  onSelectionChange(selected: any[]): void {
    this.selectedRows = selected; // Update selected rows
  }

  //Button Click Navigation
  onButtonClick(event: Event) {  
    this.router.navigate([ROUTE_URL.contractual.create]); 
  }

  // Handle Edit action
  onEdit(row: any): void {
    this.router.navigate([ROUTE_URL.contractual.update,row._id]);
  }

  // Handle delete action
  onDelete(row: any): void {
    this.deleteItem(row);
  }

  //Download File
  DownloadFile(selectedrow:any){
    const paramData = selectedrow.approval;
    if (paramData === undefined || !paramData.fullPath) {
      this.snackBarToastr.openSnackBar("Document is required for downloading file", true);
    } else {
      this.apiSer.downloadData(paramData).subscribe({
        next: (resObj:any)=>{
          const url= window.URL.createObjectURL(resObj);
          const a =document.createElement('a');
          a.href = url;
          a.download = paramData.originalName;
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (data:any)=>{
          const { error } = data || {};
          this.snackBarToastr.openSnackBar(error?.message || constants.genericSystemMsg.error, true);
        }
      })
    }
  }

  //Submit Approval
  onSubmitForApproval(row: any, updateStatus: string): void {
      this.updateStauts(row, updateStatus); // Call the method to update status
  }

  //Update Status
  updateStauts(selectedData: any, updateStatus: string): void {
    // Implement your delete logic here
    const { _id: selectedDataId } = selectedData;
    this.apiSer.updateHireStatusData(selectedDataId, {status: updateStatus}).subscribe({
      next: (resObj: any) => {
        if(resObj) {       
          this.snackBarToastr.openSnackBar(resObj?.message || constants.genericSystemMsg.update, false);
          this.fetchHireData();
        }
      },
      error: (data:any) => {
        const { error } = data || {};
        this.snackBarToastr.openSnackBar(error?.message || constants.genericSystemMsg.error, true);
      }
    })
  }

  //Delete Item
  deleteItem(deleteData: any): void {
    // Implement your delete logic here
    const { _id: deleteDataId } = deleteData;
    this.apiSer.deleteHireData(deleteDataId).subscribe({
      next: (resObj: any) => {
        if(resObj) {       
          this.snackBarToastr.openSnackBar(resObj?.message || constants.genericSystemMsg.delete, false);
          this.fetchHireData();
        }
      },
      error: (data:any) => {
        const { error } = data || {};
        this.snackBarToastr.openSnackBar(error?.message || constants.genericSystemMsg.error, true);
      }
    })
  }

  //Send Generate Activity
  onBtnClickToSendGenerateActivity(event: Event) {
    this.utilityService.processRecordsForActivityGeneration(
      this.selectedRows,
      this.fetchHireData.bind(this),
      constants.module.hire
    );
  }

}
