import { Component } from '@angular/core';
import { ROUTE_URL } from 'src/environments/route.constants';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { AuthService } from 'src/app/shared/auth.service';
import { SnackbarToastr } from 'src/app/shared/snackbar.toastr';
import { constants } from 'src/environments/constants';

@Component({
    selector: 'owner',
    templateUrl: 'owner.component.html',
    styleUrls: ['owner.component.scss']
})
export class OwnerComponent {

    currentUserRolePMOAccess: boolean = true;
    dataSource: any[] = []; // Initialize as an empty array
    loading: boolean = true; // Loading state
    errorMessage: string | null = null; // For error handling
    selectedRows: any[] = []; // Array to hold selected rows
    
    // Define table columns
    tableColumn = [
      { header: 'Owner Name', columnDef: 'owner' },
      { header: 'Status', columnDef: 'active' },
    ];
  
    actions = [
      {
        action: 'edit',
        label: 'Edit',
        icon: { name: 'edit', color: ''},
        show: true,
        onClickFunc: (selectedRow: any) => this.onEdit(selectedRow)
      },
      {
        action: 'delete',
        label: 'Delete',
        icon: { name: 'delete', color: 'warn'},
        show: true,
        onClickFunc: (selectedRow: any) => this.onDelete(selectedRow)
      }
    ];
  
constructor(
    private readonly router:Router,
    private readonly apiSer:ApiService,
    private readonly dialog: MatDialog,
    private readonly authService: AuthService,
    private readonly snackBarToastr: SnackbarToastr,
  ) {
    // this.currentUserRolePMOAccess = authService.getUserRoleIsPMO();
  }

  ngOnInit() {
    this.fetchApiData();
  }

    //Get Hire Data
    fetchApiData() {
        this.apiSer.getOwnerData().subscribe({
          next: (response) => {
            this.dataSource = response;
            console.log("test",this.dataSource);
            this.loading = false; // Data is loaded
          },
          error: (error) => {
            this.loading = false; // Stop loading
            const { message: errorMessage } = error;
            this.errorMessage = errorMessage; // Set error message for display
          }
        });
      }

      // Handle Edit action
      onEdit(row: any): void {
        this.router.navigate([ROUTE_URL.adminOwner.update,row._id]);
      }
    
      // Handle delete action
      onDelete(row: any): void {
        this.deleteItem(row);
      }

    
        //Delete Item
        deleteItem(deleteData: any): void {
          // Implement your delete logic here
          const { _id: deleteDataId } = deleteData;
          this.apiSer.deleteOwnerNameData(deleteDataId).subscribe({
            next: (resObj: any) => {
              if(resObj) {       
                this.snackBarToastr.openSnackBar(resObj?.message || constants.genericSystemMsg.delete, false);
                this.fetchApiData();
              }
            },
            error: (data:any) => {
              const { error } = data || {};
              this.snackBarToastr.openSnackBar(error?.message || constants.genericSystemMsg.error, true);
            }
          })
        }
      
  //Button Click Navigation
  onButtonClick(event: Event) {  
    this.router.navigate([ROUTE_URL.adminOwner.create]); 
  }
}
