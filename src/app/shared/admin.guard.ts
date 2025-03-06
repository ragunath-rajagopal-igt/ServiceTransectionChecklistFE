import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    // const userDetails = this.authService.getUserDetails(); // Assuming you fetch user details from AuthService
    // if (userDetails?.isAdmin) {
    //   return true;
    // }

    // Redirect to some other page if not an admin
    // this.router.navigate(['/not-authorized']); // Replace with your desired route
    return false;
  }
}
