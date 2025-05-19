import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material.module';
import { Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTE_URL } from 'src/environments/route.constants';

@Component({
    selector: 'site-name',
    templateUrl: 'site-name.component.html',
    styleUrls: ['site-name.component.scss'],
    standalone:true,
      imports:[MaterialModule, FormsModule, NgFor,CommonModule]
})
export class SiteNameComponent {

    selectedSiteName: string = '';
    submitted: boolean = false;
    getSitesName:any;
    isadmin:any;


    constructor(
        public dialogRef: MatDialogRef<SiteNameComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string, deleteObj?: any },
        private readonly router:Router,
      ) {}
    
      ngOnInit(): void {
        this.getSiteName();
      }
     onConfirm() {
        console.log('eredsfds');
     }

     getSiteName(){
      this.getSitesName = [];
      const sitename = sessionStorage.getItem('sites');
      this.getSitesName = JSON.parse(sitename);
     }

     onSubmit(): void {
        this.submitted = true;
        if(this.selectedSiteName !='') {
        sessionStorage.setItem('siteName', this.selectedSiteName);
        this.dialogRef.close();
         this.router.navigate([ROUTE_URL.contractual.default]);
        }
      }
}
