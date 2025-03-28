import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { AuthService } from 'src/app/shared/auth.service';
import { SnackbarToastr } from 'src/app/shared/snackbar.toastr';
import { ROUTE_URL } from 'src/environments/route.constants';
import * as fs from "file-saver";
import { Workbook } from "exceljs";


@Component({
    selector: 'genrate-doc',
    templateUrl: 'genrate-doc.component.html',
    styleUrls: ['genrate-doc.component.scss']
})
export class GenrateDocComponent {

    currentUserRolePMOAccess: boolean = true;
    dataSource: any[] = []; // Initialize as an empty array
    loading: boolean = true; // Loading state
    errorMessage: string | null = null; // For error handling
    selectedRows: any[] = []; // Array to hold selected rows
    
    // Define table columns
    tableColumn = [
      { header: 'Module', columnDef: 'module' },
      { header: 'Severity', columnDef: 'severity' },
      { header: 'Sub Area', columnDef: 'subArea' },
      { header: 'Status', columnDef: 'status' },
    ];

    actions = [
        {
          action: 'download',
          label: 'Download',
          icon: { name: 'download', color: ''},
          show: true,
          onClickFunc: (selectedRow: any) => this.onDownload(selectedRow)
        }
      ];
    
    constructor(
        private readonly apiSer:ApiService,
        private readonly authService: AuthService,
        private readonly snackBarToastr: SnackbarToastr,
      ) {
        this.currentUserRolePMOAccess = authService.getUserRoleIsPMO();
      }
    
      ngOnInit() {
        this.fetchDataManagementData();
      }
    
      //Get Hire Data
      fetchDataManagementData() {
        this.apiSer.getGendocument().subscribe({
          next: (response) => {

            const constructural = response.constructural;
            const dataManagement = response.dataManagement;
            const operations = response.operations;
            const service = response.service;
            const techni = response.techni;


            const combinedData = [...constructural, ...dataManagement, ...operations, ...service, ...techni];

            console.log(combinedData);
            this.dataSource = combinedData;
            // for (let model in response) {
            //     console.log(`${model}:`, response[model]);
            //   }

            this.loading = false; // Data is loaded
          },
          error: (error) => {
            this.loading = false; // Stop loading
            const { message: errorMessage } = error;
            this.errorMessage = errorMessage; // Set error message for display
          }
        });
      }
    
    
      //Button Click Download the excell
      onDownload(event: Event) {  
        console.log('dfd');
      }

    //download excel part
      downloadStc(event:Event) {
        const currentDate = new Date();
        let reportData = {
          bookname: `RI-GoLive-Service Transition Checklist-v1.xlsx`,
          title: "RI-ServiceTransitionChecklist",
          data: this.dataSource
        };
        this.onexcelLoad(reportData)
      }

      onexcelLoad(excelData:any) {
        const title = excelData.title;
        const wbookname = excelData.bookname;
        const titleStyle =  {
            size:10,
            bold:true,           
          }
        
        // let titleRow = worksheet.getCell("C1");
        // titleRow.value = title;
        //Create a workbook with a worksheet
        let workbook = new Workbook();
        // let employees = ;
        const worksheet = workbook.addWorksheet(title, { properties:{tabColor:{argb:'3b02a5'}}})
        worksheet.columns = [
            { header: 'Severity', key: 'severity', width: 30 },
            { header: 'Area', key: 'module', width: 30 },
            { header: 'Sub-Area', key: 'subArea', width: 20 },
            { header: 'Item/Activity', key: 'itemActivity', width: 40 },
            { header: 'Product Name', key: 'productName', width: 30 },
            { header: 'Owner', key: 'owner', width: 20 },
            { header: 'Status', key: 'status', width: 30 },
            { header: 'ETA', key: 'eta', width: 30 },
            { header: 'Doc Ref', key: 'documentReference', width: 40 },
            { header: 'Note', key: 'note', width: 40 }
            
          ];

          const headerRow = worksheet.getRow(1);
          headerRow.eachCell((cell) => {
            cell.style = {
              font: { bold: true, color: { argb: 'FFFFFF' } },
              fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '4CAF50' }, // Set background color (green)
              },
              alignment: { horizontal: 'center' }, // Align text to center
            };
          });
           // Dynamically append rows
        this.dataSource.forEach(data => {
        worksheet.addRow(data);
      });
        workbook.xlsx.writeBuffer().then(data => {
            let blob = new Blob([data], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });
            fs.saveAs(blob, wbookname);
          });
      }
    
}
