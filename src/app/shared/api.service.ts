// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIEndPoints } from '../http/api-endpoints';
import { features } from 'process';
import { AuthService } from './auth.service';
import { response } from 'express';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient, private readonly authService: AuthService,) {}

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/user`);
  }

  authLogin(data: any): Observable<any> {
    return this.http.post(APIEndPoints.auth.login, data);
  }

  refreshToken(): Observable<string> {
    const refreshToken = this.authService.getRefreshToken(); // Method to get the refresh token
  
    return this.http.post<any>(APIEndPoints.auth.refreshToken, { refreshToken }).pipe(
      tap((response: any) => {
        const { data } = response;
        this.authService.storeToken(data?.accessToken || ''); // Store the new access token
      }),
      map(response => response?.data?.accessToken)
    );
  }
  
  logout(): Observable<any> {
    const refreshToken = this.authService.getRefreshToken();
    return this.http.post(APIEndPoints.auth.logout, { refreshToken }).pipe(
      tap((response: any) => {
        this.authService.logout(); // Store the new access token
      }));
  }

  verifyAccount(data: any): Observable<any> {
    return this.http.post(APIEndPoints.auth.verifyEmail, data);
  }

  updatePassword(data: any): Observable<any> {
    return this.http.post(APIEndPoints.auth.updatePassword, data);
  }
  
  getAllSubLocations(): Observable<any> {
    return this.http.get(APIEndPoints.common.allSubLocation);
  }

   // New method for getting users by category and date
   getUsersByCategoryAndDate(category: string, startDate: Date, endDate: Date): Observable<any> {
    const requestData = {
      category,
      startDate,
      endDate,
    };
    return this.http.post(APIEndPoints.reports.generate, requestData);
  }

  
  getUserForm(data:any): Observable<any> {
    return this.http.post(APIEndPoints.newuser.generateForm, data);
  }

  getUserData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/list`);
  }

  getDownloadData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/download/list`);
  }

  getDownloadTemplateData(data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/download/template`, data);
  }
   
  getSubLocation(): Observable<any> {
    return this.http.post(APIEndPoints.newUser,{});
  }

  saveNewUserData(data: any): Observable<any> {
    return this.http.post(APIEndPoints.saveUser, data);
  }
  updateUserData(data: any): Observable<any> {
    return this.http.post(APIEndPoints.updateUser, data);
  }
  updateUserStatusData(id: any, data:any): Observable<any> {
    return this.http.post(`${APIEndPoints.newuser.updateStatusUser}/${id}`, data);
  }

  findLocation(data:any): Observable<any>{
    return this.http.post(APIEndPoints.getLocation, data);
  }

  getLocationData(): Observable<any> {
    return this.http.get(APIEndPoints.common.location);
  }

  getSubLocations(data): Observable<any> {
    return this.http.post(APIEndPoints.common.subLocation, data);
  }

  getIGTIdAndEmailFormField(data: any): Observable<any> {
    return this.http.post(APIEndPoints.newuser.igtIdAndEmailForm, data);
  }
  
  updateIGTIdAndEmailFormField(data: any): Observable<any> {
    return this.http.post(APIEndPoints.newuser.igtIdAndEmailUpdate, data);
  }

 
/**
 * constructural 
 */
getConstructuralData(): Observable<any> {
  return this.http.get(`${this.apiUrl}/constructural/list`);
}
getGeneratedConstructuralFields(data:any): Observable<any> {
  return this.http.post(APIEndPoints.constructural.generateForm, data);
}
saveContructuralData(data: any): Observable<any> {
  return this.http.post(APIEndPoints.constructural.saveContructural, data);
}
deleteContructuralData(id: any): Observable<any> {
  return this.http.delete(`${APIEndPoints.constructural.delete}/${id}`);
}
updateContructuralData(data: any): Observable<any> {
  return this.http.post(APIEndPoints.constructural.update,data);
}


  /** 
   * Network Setup Module - Api Start
   */
  // Get network setup list data
  getNetworkSetupList(): Observable<any> {
    return this.http.get(APIEndPoints.networkSetup.getList);
  }

  // Save network setup data - create
  saveNetworkSetupData(data: any, id: string = ''): Observable<any> {
    return this.http.post(id === '' ? APIEndPoints.networkSetup.create : `${APIEndPoints.networkSetup.update}/${id}`, data);
  }

  // Save network setup data - create
  saveNetworkSetupIGTIdData(data: any, id: string = ''): Observable<any> {
    return this.http.post(`${APIEndPoints.networkSetup.updateIgtId}/${id}`, data);
  }
  
  deleteNetworkSetupData(id: any): Observable<any> {
    return this.http.delete(`${APIEndPoints.networkSetup.delete}/${id}`);
  }

  getGenerateFormField(data: any): Observable<any> {
    return this.http.post(APIEndPoints.networkSetup.form, data);
  }
  updateNetworkStatusData(id: any, data:any): Observable<any> {
    return this.http.post(`${APIEndPoints.networkSetup.updateStatus}/${id}`, data);
  }

  /**
   * New Hire Module - Api End
   */
  getNewHire(): Observable<any> {
    return this.http.post(APIEndPoints.newHire.create,{});
  }
  getEditHire(data:any): Observable<any> {
    return this.http.post(APIEndPoints.newHire.edit, data);
  }
  getGeneratedHireFields(data:any): Observable<any> {
    return this.http.post(APIEndPoints.newHire.generateForm, data);
  }
  saveNewHireData(data: any): Observable<any> {
    return this.http.post(APIEndPoints.newHire.save, data);
  }
  getHireData(): Observable<any> {
    return this.http.get(APIEndPoints.newHire.get,{});
  }
  updateHireData(data: any): Observable<any> {
    return this.http.post(APIEndPoints.newHire.update, data);
  }
  deleteHireData(id: any): Observable<any> {
    return this.http.delete(`${APIEndPoints.newHire.delete}/${id}`);
  }
  updateHireStatusData(id: any, data:any): Observable<any> {
    return this.http.post(`${APIEndPoints.newHire.updateStatusHire}/${id}`, data);
  }
  downloadData(data:any): Observable<any> {
    return this.http.post(APIEndPoints.common.download, data,{responseType:"blob"});
  }
  /**
   * New user Delete Module - Api End
   */
   deleteNewUserData(id: any): Observable<any> {
    return this.http.delete(`${APIEndPoints.newuser.delete}/${id}`);
  }

  /**
   * New short trip 
   */
  getNewTrip(data:any): Observable<any> {
    return this.http.post(APIEndPoints.shortTrip.create, data);
  }
  getEditTrip(data:any): Observable<any> {    
    return this.http.post(APIEndPoints.shortTrip.edit, data);
  }
  saveNewTrip(data: any): Observable<any> {
    return this.http.post(APIEndPoints.shortTrip.save, data);
  }
  getShortTripList(): Observable<any> {
    return this.http.get(APIEndPoints.shortTrip.get);
  }
  updateTripData(data: any): Observable<any> {
    return this.http.post(APIEndPoints.shortTrip.update, data);
  }
  fileuploadTripData(data: any): Observable<any> {
    return this.http.post(APIEndPoints.fileUpload, data);
  }
  deleteTripData(id: any): Observable<any> {
    return this.http.delete(`${APIEndPoints.shortTrip.delete}/${id}`);
  }
  updateShortTripStatus(id: any, data:any): Observable<any> {
    return this.http.post(`${APIEndPoints.shortTrip.updateStatus}/${id}`, data);
  }
  
  /** 
   * Location Transfer Module - Api End
   */

  getLocationTransferData(): Observable<any> {
    return this.http.get(APIEndPoints.locationTransfer.getLocation,{});
  }
  updateLocationTransferData(data: any): Observable<any> {
    return this.http.post(APIEndPoints.locationTransfer.update, data);
  }
  saveLocationTransferData(data: any): Observable<any> {
    return this.http.post(APIEndPoints.locationTransfer.save, data);
  }
  deleteLocationTransfer(id: any): Observable<any> {
    return this.http.delete(`${APIEndPoints.locationTransfer.delete}/${id}`);
  }
  updateLocationTransferStatus(id: any, data:any): Observable<any> {
    return this.http.post(`${APIEndPoints.locationTransfer.updateStatus}/${id}`, data);
  }
  getGenerateLocationTransferFields(data:any): Observable<any> {
    return this.http.post(APIEndPoints.locationTransfer.form, data);
  }

  /**
   * Terminate Module - Api End
   */
  getNewTerminate(data:any): Observable<any> {    
    return this.http.post(APIEndPoints.terminate.create,data);
  }
  saveNewTerminateData(data: any): Observable<any> {
    return this.http.post(APIEndPoints.terminate.save, data);
  }
  updateTerminateData(data: any): Observable<any> {
    return this.http.put(APIEndPoints.terminate.update, data);
  }
  getTerminateData(): Observable<any> {
    return this.http.get(APIEndPoints.terminate.get);
  }
  getEditTerminate(data:any): Observable<any> {
    return this.http.post(APIEndPoints.terminate.edit, data);
  }
  deleteTerminateData(id: any): Observable<any> {
    return this.http.delete(`${APIEndPoints.terminate.delete}/${id}`);
  }
  updateTerminateStatus(id: any, data:any): Observable<any> {
    return this.http.post(`${APIEndPoints.terminate.updateStatus}/${id}`, data);
  }

  /**
   * Project Movement Module - Api End
   */
  getNewProjectMovement(): Observable<any> {
    return this.http.post(APIEndPoints.projectMovement.create,{});
  }
  getEditProjectMovement(data:any): Observable<any> {
    return this.http.post(APIEndPoints.projectMovement.edit, data);
  }
  saveNewProjectMovementData(data: any): Observable<any> {
    return this.http.post(APIEndPoints.projectMovement.save, data);
  }
  getProjectMovementData(): Observable<any> {
    return this.http.get(APIEndPoints.projectMovement.get,{});
  }
  updateProjectMovementData(data: any): Observable<any> {
    return this.http.post(APIEndPoints.projectMovement.update, data);
  }
  deleteProjectMovementData(id: any): Observable<any> {
    return this.http.delete(`${APIEndPoints.projectMovement.delete}/${id}`);
  }
  updateProjectMovementStatus(id: any, data:any): Observable<any> {
    return this.http.post(`${APIEndPoints.projectMovement.updateStatus}/${id}`, data);
  }
  
  /**
   * Inactivate api 
   */
  getGenerateInactivateFormField(data: any): Observable<any> {
    return this.http.post(APIEndPoints.inactivate.form, data);
  }
  // Get network setup list data
  getInactivateList(): Observable<any> {
    return this.http.get(APIEndPoints.inactivate.getList);
  }
  // Save inactivate data - create
  saveInactivateData(data: any, id: string = ''): Observable<any> {
    return this.http.post(id === '' ? APIEndPoints.inactivate.create : `${APIEndPoints.inactivate.update}/${id}`, data);
  }
  
  deleteInactivateData(id: any): Observable<any> {
    return this.http.delete(`${APIEndPoints.inactivate.delete}/${id}`);
  }
  
  updateInactivateStatus(id: any, data:any): Observable<any> {
    return this.http.post(`${APIEndPoints.inactivate.updateStatus}/${id}`, data);
  }

  /**
   * Common file upload with temp path api
   */
  fileuploadData(data: any): Observable<any> {
    return this.http.post(APIEndPoints.common.fileUpload, data);
  }

  /**
   * Reactivate Module - Api End
   */
  getReactivateData(): Observable<any> {
    return this.http.get(APIEndPoints.reactivate.get,{});
  }
  getNewReactivate(data): Observable<any> {
    return this.http.post(APIEndPoints.reactivate.create, data);
  }
  saveReactivateData(data: any): Observable<any> {
    return this.http.post(APIEndPoints.reactivate.save, data);
  }
  getEditReactivate(data:any): Observable<any> {
    return this.http.post(APIEndPoints.reactivate.edit, data);
  }
  updateReactivateData(data: any): Observable<any> {
    return this.http.post(APIEndPoints.reactivate.update, data);
  }
  deleteReactivateData(id: any): Observable<any> {
    return this.http.delete(`${APIEndPoints.reactivate.delete}/${id}`);
  }
  updateReactivateStatus(id: any, data:any): Observable<any> {
    return this.http.post(`${APIEndPoints.reactivate.updateStatus}/${id}`, data);
  }

  
  /** 
   * Generate Activity Module - Api Start
   */
  getGenerateActivityList(): Observable<any> {
    return this.http.get(APIEndPoints.generateActivity.getList);
  }
  sendToGenerateActivity(data:any): Observable<any> {
    return this.http.post(`${APIEndPoints.generateActivity.sendToGenerateActivity}`, data);
  }
  downloadGenerateActivity(data:any): Observable<any> {
    return this.http.post(`${APIEndPoints.generateActivity.downloadGenerateActivity}`, data);
  }

  downloadGenerateActiveExcel(data:any): Observable<any> {
    return this.http.post(`${APIEndPoints.generateActivity.downloadGenerateData}`, data);
  }

  updateActivityStatusData(id: any, data:any): Observable<any> {
    return this.http.post(`${APIEndPoints.generateActivity.updateStatus}/${id}`, data);
  }

  /**
   * Terminate Module - Api End
   */
  getNewReports(): Observable<any> {
    return this.http.post(APIEndPoints.reports.create,{});
  }
  generateReports(data: any): Observable<any> {
    return this.http.post(APIEndPoints.reports.generate, data);
  }

  /**
   * Dashboard Api
   * 
   */
  getDashboardDetails(data: any): Observable<any> {
    return this.http.get(APIEndPoints.dashboard.getDetails, data);
  }

  /**
   * Account Setting Api
   */
  getGenerateAccountFormField(data: any): Observable<any> {
    return this.http.post(APIEndPoints.accountSetting.generateForm, data);
  }
  
  saveRgisterUser(data: any): Observable<any> {
    return this.http.post(APIEndPoints.accountSetting.save, data);
  }

  getAccountSettingsList(): Observable<any> {
    return this.http.get(`${APIEndPoints.accountSetting.getAppUserList}`);
  }
  
  getManagerDetailsList(): Observable<any> {
    return this.http.get(`${APIEndPoints.accountSetting.getManagerDetailsList}`);
  }

  getGenerateManagerFormField(data: any): Observable<any> {
    return this.http.post(APIEndPoints.accountSetting.generateManagerForm, data);
  }
  saveManagerDetails(data: any): Observable<any> {
    return this.http.post(APIEndPoints.accountSetting.saveManagerDetails, data);
  }
  updateManagerDetails(id: any, data:any): Observable<any> {
    return this.http.post(`${APIEndPoints.accountSetting.updateManagerDetails}/${id}`, data);
  }
}

