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
  //  getUsersByCategoryAndDate(category: string, startDate: Date, endDate: Date): Observable<any> {
  //   const requestData = {
  //     category,
  //     startDate,
  //     endDate,
  //   };
  //   return this.http.post(APIEndPoints.reports.generate, requestData);
  // }

  
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
  return this.http.post(APIEndPoints.constructural.save, data);
}
deleteContructuralData(id: any): Observable<any> {
  return this.http.delete(`${APIEndPoints.constructural.delete}/${id}`);
}
updateContructuralData(data: any): Observable<any> {
  return this.http.post(APIEndPoints.constructural.update,data);
}


/**
 * Data Management
 */

getGeneratedDataManagementFields(data:any): Observable<any> {
  return this.http.post(APIEndPoints.dataManagement.generateForm, data);
}
saveDataManagementData(data: any): Observable<any> {
  return this.http.post(APIEndPoints.dataManagement.save, data);
}
updateDataManagementData(data: any): Observable<any> {
  return this.http.post(APIEndPoints.dataManagement.update,data);
}
getDataManagementData(): Observable<any> {
  return this.http.get(`${this.apiUrl}/data-management/list`);
}
deleteDataManagementData(id: any): Observable<any> {
  return this.http.delete(`${APIEndPoints.dataManagement.delete}/${id}`);
}

/**
 * Operations
 */
getGeneratedOperationsFields(data:any): Observable<any> {
  return this.http.post(APIEndPoints.operations.generateForm, data);
}
saveOperationsData(data: any): Observable<any> {
  return this.http.post(APIEndPoints.operations.save, data);
}
updateOperationsData(data: any): Observable<any> {
  return this.http.post(APIEndPoints.operations.update,data);
}
getOperationsData(): Observable<any> {
  return this.http.get(`${this.apiUrl}/operations/list`);
}
deleteOperationsData(id: any): Observable<any> {
  return this.http.delete(`${APIEndPoints.operations.delete}/${id}`);
}


/**
 * Service Management
 */
getGeneratedServiceManagementFields(data:any): Observable<any> {
  return this.http.post(APIEndPoints.serviceManagement.generateForm, data);
}
saveServiceManagementData(data: any): Observable<any> {
  return this.http.post(APIEndPoints.serviceManagement.save, data);
}
updateServiceManagementData(data: any): Observable<any> {
  return this.http.post(APIEndPoints.serviceManagement.update,data);
}
getServiceManagementData(): Observable<any> {
  return this.http.get(`${this.apiUrl}/service-management/list`);
}
deleteServiceManagementData(id: any): Observable<any> {
  return this.http.delete(`${APIEndPoints.serviceManagement.delete}/${id}`);
}

/**
 * Technical
 */
getGeneratedTechnicalFields(data:any): Observable<any> {
  return this.http.post(APIEndPoints.technical.generateForm, data);
}
saveTechnicalData(data: any): Observable<any> {
  return this.http.post(APIEndPoints.technical.save, data);
}
updateTechnicalData(data: any): Observable<any> {
  return this.http.post(APIEndPoints.technical.update,data);
}
getTechnicalData(): Observable<any> {
  return this.http.get(`${this.apiUrl}/technical/list`);
}
deleteTechnicalData(id: any): Observable<any> {
  return this.http.delete(`${APIEndPoints.technical.delete}/${id}`);
}





  /**
   * Common file upload with temp path api
   */
  fileuploadData(data: any): Observable<any> {
    return this.http.post(APIEndPoints.common.fileUpload, data);
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

  /**
   * admin severity
   */

  getSeverityData(): Observable<any> {
    return this.http.get(APIEndPoints.adminSeverity.listData);
  }

  getGeneratedSeverityFields(data:any): Observable<any> {
    return this.http.post(APIEndPoints.adminSeverity.generateForm, data);
  }

  saveAdminSeverityData(data: any): Observable<any> {
    return this.http.post(APIEndPoints.adminSeverity.save, data);
  }
  updateSeverityData(data: any): Observable<any> {
    return this.http.post(APIEndPoints.adminSeverity.update,data);
  }

  deleteSeverityData(id: any): Observable<any> {
    return this.http.delete(`${APIEndPoints.adminSeverity.delete}/${id}`);
  }

  
  /**
   * admin severity
   */

  getSubareaData(): Observable<any> {
    return this.http.get(APIEndPoints.adminSubArea.listData);
  }

  getGeneratedSubareaFields(data:any): Observable<any> {
    return this.http.post(APIEndPoints.adminSubArea.generateForm, data);
  }

  saveAdminSubareaData(data: any): Observable<any> {
    return this.http.post(APIEndPoints.adminSubArea.save, data);
  }
  updateSubareaData(data: any): Observable<any> {
    return this.http.post(APIEndPoints.adminSubArea.update,data);
  }

  deleteSubareaData(id: any): Observable<any> {
    return this.http.delete(`${APIEndPoints.adminSubArea.delete}/${id}`);
  }

/**
* admin Item/Action
*/
getItemData(): Observable<any> {
  return this.http.get(APIEndPoints.adminItem.listData);
}

getGeneratedItemFields(data:any): Observable<any> {
  return this.http.post(APIEndPoints.adminItem.generateForm, data);
}

saveAdminItemData(data: any): Observable<any> {
  return this.http.post(APIEndPoints.adminItem.save, data);
}
updateItemData(data: any): Observable<any> {
  return this.http.post(APIEndPoints.adminItem.update,data);
}

deleteItemData(id: any): Observable<any> {
  return this.http.delete(`${APIEndPoints.adminItem.delete}/${id}`);
}

/**
 * admin Product Name
 */
getProductData(): Observable<any> {
  return this.http.get(APIEndPoints.adminProductName.listData);
}

getGeneratedProductNameFields(data:any): Observable<any> {
  return this.http.post(APIEndPoints.adminProductName.generateForm, data);
}

saveAdminProductNameData(data: any): Observable<any> {
  return this.http.post(APIEndPoints.adminProductName.save, data);
}
updateProductNameData(data: any): Observable<any> {
  return this.http.post(APIEndPoints.adminProductName.update,data);
}

deleteProductNameData(id: any): Observable<any> {
  return this.http.delete(`${APIEndPoints.adminProductName.delete}/${id}`);
}


/**
 * Owner Name
 */
getOwnerData(): Observable<any> {
  return this.http.get(APIEndPoints.adminOwner.listData);
}

getGeneratedownerFields(data:any): Observable<any> {
  return this.http.post(APIEndPoints.adminOwner.generateForm, data);
}

saveAdminOwnerNameData(data: any): Observable<any> {
  return this.http.post(APIEndPoints.adminOwner.save, data);
}
updateOwnerNameData(data: any): Observable<any> {
  return this.http.post(APIEndPoints.adminOwner.update,data);
}

deleteOwnerNameData(id: any): Observable<any> {
  return this.http.delete(`${APIEndPoints.adminOwner.delete}/${id}`);
}

/**
 * Status
 */

getStatusData(): Observable<any> {
  return this.http.get(APIEndPoints.adminStatus.listData);
}

getGeneratedStatusFields(data:any): Observable<any> {
  return this.http.post(APIEndPoints.adminStatus.generateForm, data);
}

saveAdminStatusData(data: any): Observable<any> {
  return this.http.post(APIEndPoints.adminStatus.save, data);
}
updateStatusData(data: any): Observable<any> {
  return this.http.post(APIEndPoints.adminStatus.update,data);
}

deleteStatusData(id: any): Observable<any> {
  return this.http.delete(`${APIEndPoints.adminStatus.delete}/${id}`);
}

/** 
 * Gen document
*/
getGendocument(): Observable<any> {
  return this.http.get(`${this.apiUrl}/gendoc/list`);
}

}





