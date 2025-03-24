// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}
  pmoRole = "PMO";
  // Check if the token exists
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists, otherwise false
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Login method to store token (this would typically come from your backend)
  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Login method to store token (this would typically come from your backend)
  login(token: string, refreshToken: string, userDetails: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    const organizationCode = userDetails?.organization[0]?.code || '';
    localStorage.setItem('currentOrganization', organizationCode);
  }

  // Logout method to clear token
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('currentOrganization');
    sessionStorage.clear();
    sessionStorage.removeItem('')
  }

  // Get org code from localStorage
  getUserPermissionModules(): Array<String> {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    let permission  = [];
    if (userDetails && userDetails.permission) {
      permission = userDetails.permission;
    }
    return permission;
  }

  // Get userDetails from localStorage
  getUserDetails(): any {
    return JSON.parse(localStorage.getItem('userDetails'));;
  }

  // Get org code from localStorage
  getOrgCode(): string | null {
    return localStorage.getItem('currentOrganization');
  }
  
  // Set org code from localStorage
  updateOrgCode(orgCode: string): void {
    localStorage.setItem('currentOrganization', orgCode);
  }

  //Handle role Based Org Enable
  getRoleBasedOrgEnable() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (userDetails.role && (userDetails.role.code === this.pmoRole || userDetails.isAdmin === true)) {
      return false;
    }
    const organization = userDetails?.organization || [];
    if (userDetails.role && userDetails.role.code === "PM" && organization.length > 1) {
      return false;
    }
    return true;
  }

  //Handle Get Organization
  getOrganization() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const organization = userDetails?.organization || [];
    if (organization.length > 0) {
      return organization;
    }
    return [];
  }

  //Handle Get Role PMO
  getUserRoleIsPMO() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (userDetails.role && (userDetails.role.code === this.pmoRole || userDetails.isAdmin === true)) {
      return true;
    } else {
      return false;
    }
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
}
