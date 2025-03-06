import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SharedModule, } from 'src/app/theme/shared/shared.module';
import {
  MatDialog,  MatDialogActions,  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MaterialModule } from 'src/app/shared/material.module';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  standalone:true,
  imports:[SharedModule,MaterialModule]
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string, selectedObj?: any }
  ) {}

  ngOnInit(): void {

 }

 //Handle cancel event
  onCancel(): void {
    this.dialogRef.close(false); // Close dialog with false when cancel is clicked
  }

  //Handle confirm event
  onConfirm(): void {
    this.dialogRef.close(this.data.selectedObj); // Close dialog with true when confirm is clicked
  }
}
