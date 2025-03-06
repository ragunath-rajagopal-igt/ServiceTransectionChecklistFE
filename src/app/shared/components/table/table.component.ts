import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/shared/material.module';
import { SelectionModel } from '@angular/cdk/collections';
import { constants } from 'src/environments/constants';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { DeleteDialogComponent } from '../dialog/delete-dialog/delete-dialog.component';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [DatePipe]
})
export class TableComponent implements OnInit, OnChanges {
    
    columnValues: any[] = [];
    totalLength: number = 0;
    displayedColumns: string[] = [];
    selection = new SelectionModel<any>(true, []);
    currentUserRolePMOAccess: boolean = true;
    @Input() columns: { columnDef: string, header: string, field?: any }[] = [];
    @Input() actions: any;
    @Input() public dataSource: any;
    @Input() filterVal:any;
    @Output() selectionChange = new EventEmitter<any[]>(); // Emit selection change

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    // Set MatSort and initialize data source attributes
    @ViewChild(MatSort) set matSort(ms: MatSort) {
      this.sort = ms;
      this.setDataSourceAttributes();
    }
  
    // Set MatPaginator and initialize data source attributes
    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
        this.paginator = mp;
        this.setDataSourceAttributes();
    }
  
    constructor(
      private datePipe: DatePipe,
      private readonly dialog: MatDialog,
      private readonly authService: AuthService,
    ) {
      // this.currentUserRolePMOAccess = authService.getUserRoleIsPMO();
    }

    // Set paginator and sorting attributes for the data source
    setDataSourceAttributes(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // Uncomment if filtering logic is required
        // if (this.paginator && this.sort) {
        //     this.applyFilter('');
        // }
    }
  
    // Initialize the component
    ngOnInit(): void {
      const tempColumns = this.columns.map((c) => c.columnDef);
      this.displayedColumns = ['select', ...tempColumns, 'action'];
    }

    // Handle input changes (e.g., when dataSource changes)
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['dataSource'] && this.dataSource) {
        this.selection.clear();
        this.emitSelectionChange();
        this.dataSource = new MatTableDataSource(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }

    //Handle Format Value
    getFormattedValue(column, element) {
      const columnType = column?.field?.type || '';
      const columnDateFormat = column?.field?.format || 'dd/MM/yyyy'
      switch(columnType) {
        case 'date':
          const dateValue = element[column.columnDef];
          return this.datePipe.transform(dateValue, columnDateFormat);
        case 'selector':
          const selectorValue = element[column.columnDef];
          let selectorKeyValue = '';
          if (column.field && column.field.selector) {
            selectorKeyValue = column.field.selector;
          }
          return this.getNestedValue(selectorValue, selectorKeyValue);
        case 'options':
          const optionValue = element[column.columnDef];
          const options = column?.field?.options || [];
          return this.getLabelByValue(optionValue, options);
        default:
          return element[column.columnDef];
      }
    }

     /**
     * Finds and returns the label corresponding to the given value.
     * @param value The value to search for.
     * @returns The label if found, or `null` if not found.
     */
    getLabelByValue(value: string, options: any): string | null {
      const option = options.find(opt => opt.value === value);
      return option ? option.label : null;
    }
    
    getNestedValue(obj: any, selector: string): any {
      return selector.split('.').reduce((acc, key) => {
        return acc ? acc[key] : undefined;
      }, obj);
    }
  
    // Apply filtering based on user input
    applyFilter(filterVal: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      const tableFilters = [];
      tableFilters.push({
        id: 'incidentID',
        value: filterValue
      });
      console.log(tableFilters);
      this.dataSource.filter = JSON.stringify(tableFilters);

      // if (this.dataSource.paginator) {
      //   this.dataSource.paginator.firstPage();
      // }
    }

    // Handle Edit Button Click
    onEdit(element: any): void {
      if (this.actions && this.actions.edit && this.actions.edit.onClickFunc) {
        this.actions.edit.onClickFunc(element);
      }
    }

    // Handle Delete Button Click
    onDelete(element: any): void {
      if (this.actions && this.actions.delete && this.actions.delete.onClickFunc) {
        this.actions.delete.onClickFunc(element);
      }
    }

    checkDisableRow(row: any) {
      return false;
      // return row.status === constants.status.approved ? false : true;
    }
    /** Selects all rows if they are not all selected; otherwise, clear selection. */
    masterToggle(): void {
      this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
      this.emitSelectionChange();
    }

    /** Checks if the number of selected rows is equal to the total number of rows. */
    isAllSelected(): boolean {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    // Get label for checkbox
    checkboxLabel(row?: any): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} ${row.name}`;
    }

    // Handle row selection change
    onRowSelectionChange(row: any): void {
      this.selection.toggle(row); // Toggle the selection for the row
      this.emitSelectionChange();
    }

    // Emit currently selected rows
    private emitSelectionChange(): void {
      this.selectionChange.emit(this.selection.selected);
    }

    //Handle Status Check
    onStatusItemCheck(action: any, row: any): boolean {
      switch(action.action) {
        case 'edit':
        case 'delete':
          if (action.show === true || action.statusCheckIncludes.includes(row.status)) {
            return true;
          } else {
            return false;
          }
        case 'status_submit':
          if (action.show === true && action.statusCheckIncludes.includes(row.status) && this.currentUserRolePMOAccess === false) {
            return true;
          } else {
            return false;
          }
        case 'status_approve':
          if (action.show === true && action.statusCheckIncludes.includes(row.status) && this.currentUserRolePMOAccess === true) {
            return true;
          } else {
            return false;
          }
        case 'status_refer_back_to_initiator':
          if (action.show === true && action.statusCheckIncludes.includes(row.status) && this.currentUserRolePMOAccess === true) {
            return true;
          } else {
            return false;
          }
        default:
          return true;
      }
    }

    //Handle Action Click
  onActionClick(action, row) {
    switch(action.action) {
      case 'edit':
        action.onClickFunc(row);
        break;
      case 'delete':
        this.openDeleteDialog(action, row);
        break;
      case 'status_submit':
        this.onStausUpdate(action, row, constants.status.submitted);
        break;
      case 'status_approve':
        this.onStausUpdate(action, row, constants.status.approved);
        break;
      case 'status_refer_back_to_initiator':
        this.onStausUpdate(action, row, constants.status.referred_back);
        break;
      default:
        action.onClickFunc(row);
        break;
    }       
  }
    
  //Handle Statuc Update
  onStausUpdate(action: any, row: any, updateStatus: string): void {
    const contentMsg = {
      submitted: 'Are you sure you want to submit this record for approval ?',
      approved: 'Are you sure you want to approve this record ?',
      referred_back: 'Are you sure you want to refer back to it initiator ?',
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmation',
        message: contentMsg[updateStatus] || '',
        selectedObj: row
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.updateStauts(result, updateStatus); // Call the method to delete the item
        action.onClickFunc(row, updateStatus);
      }
    });
  }

  //Handle Delete Dialog
  openDeleteDialog(action: any, row: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this item?',
        deleteObj: row
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        action.onClickFunc(result); // Call the method to delete the item
      }
    });
  }
}
