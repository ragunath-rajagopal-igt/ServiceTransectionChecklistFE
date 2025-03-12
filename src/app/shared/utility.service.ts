import { Injectable } from '@angular/core';
import { constants } from 'src/environments/constants';
import { ApiService } from './api.service';
import { SnackbarToastr } from './snackbar.toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  private hidefileSubject = new BehaviorSubject<any>(null);
  hidefileValue$ = this.hidefileSubject.asObservable();

  constructor(
    private readonly snackBarToastr: SnackbarToastr,
    private apiSer: ApiService
  ) {}

  // processRecordsForActivityGeneration(
  //   selectedRecords: any[],
  //   successCallback: () => void,
  //   module: string,
  //   requiredStatus = constants.status.approved
  // ) {
  //   const notApproved = [];
  //   const approvedRecords = [];

  //   selectedRecords.forEach((row) => {
  //     if (row.status === requiredStatus) {
  //       approvedRecords.push(row._id);
  //     } else {
  //       notApproved.push(row._id);
  //     }
  //   });

  //   if (notApproved.length > 0) {
  //     this.snackBarToastr.openSnackBar("Please select only approved records to send for generate activity", true);
  //   } else {
  //     this.apiSer.sendToGenerateActivity({
  //       status: constants.status.sent_to_generate_activity,
  //       selectedRecords: approvedRecords,
  //       module
  //     }).subscribe({
  //       next: (resObj: any) => {
  //         this.snackBarToastr.openSnackBar(resObj?.message || constants.genericSystemMsg.update, false);
  //         successCallback();
  //       },
  //       error: (data: any) => {
  //         const { error } = data || {};
  //         this.snackBarToastr.openSnackBar(error?.message || constants.genericSystemMsg.error, true);
  //       }
  //     });
  //   }
  // }

  sendValue(value: any): void {
    this.hidefileSubject.next(value);
  }
}
