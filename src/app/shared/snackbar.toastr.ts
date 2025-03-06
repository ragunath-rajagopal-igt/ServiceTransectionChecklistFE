import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarToastr {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  constructor(private readonly _snackBar: MatSnackBar) {}

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
