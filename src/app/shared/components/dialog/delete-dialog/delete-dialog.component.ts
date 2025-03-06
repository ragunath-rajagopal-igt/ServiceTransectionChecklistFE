import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
  standalone:true,
  imports:[MaterialModule]
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string, deleteObj?: any }
  ) {}

  ngOnInit(): void {

 }

 //Handle cancel event
  onCancel(): void {
    this.dialogRef.close(false); // Close dialog with false when cancel is clicked
  }

  //Handle confirm event
  onConfirm(): void {
    this.dialogRef.close(this.data.deleteObj); // Close dialog with true when confirm is clicked
  }
}
