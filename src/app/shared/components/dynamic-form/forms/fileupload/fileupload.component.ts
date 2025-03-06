import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { APIEndPoints } from 'src/app/http/api-endpoints';
import { ApiService } from 'src/app/shared/api.service';

@Component({
    selector: 'app-fileupload',
    templateUrl: 'fileupload.component.html',
    styleUrls: ['fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {
    @Input() formVal:FormGroup;
    @Input() field:any;
    file_store: FileList;
    file_list: Array<string> = [];
    fileName:any;
    selectedFile: File = null;
    uploadedFile: any = null;
    private _snackBar = inject(MatSnackBar);

    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds: number = 3;
    
    constructor(private readonly http: HttpClient, private apiSer:ApiService) {}
    
    ngOnInit(): void {
      if (this.field.attributes && this.field.attributes.value && this.field.attributes.value.originalName) {
        this.fileName = this.field.attributes.value.originalName;
        this.formVal.controls[this.field.attributes.formControlName].setValue(this.field.attributes.value);
      }
    }

    //Handle File Select
     onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        const maxSize = 2 * 1024 * 1024; // 2 MB in bytes

        // Validate file size
        if (this.selectedFile.size > maxSize) {
            this.openSnackBar('File size exceeds 2 MB limit', true);
            this.selectedFile = null; // Clear the selected file
            this.fileName = ''; // Clear the displayed file name
            this.formVal.controls[this.field.attributes.formControlName].setValue(null);
            return; // Stop further execution
        }
        
        this.fileName = this.selectedFile.name;
        this.formVal.controls[this.field.attributes.formControlName].setValue(this.selectedFile);
        this.onUpload();
      }
  
      //Handle File Upload
      onUpload() {
        if (this.selectedFile) {
          this.uploadedFile = null;
          const formData = new FormData();
          formData.append('file', this.selectedFile);
             this.apiSer.fileuploadData(formData).subscribe({
              next:(resObj:any) => {
                this.uploadedFile = resObj.file;
                this.uploadedFile.newlyUpload = true;
                this.formVal.controls[this.field.attributes.formControlName].setValue(this.uploadedFile);
                this.openSnackBar('File Upload Successfully', false);
              },
              error: (data:any) => {
                this.openSnackBar(data, true);
              }
            })
        }
      }

      //Handle Open Snack Bar
      openSnackBar(msg: string, isError: boolean) {
        this._snackBar.open(msg, 'X', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
          panelClass: [isError ? 'panel-toastr-err' : 'panel-toastr-success']
        });
      }
}
