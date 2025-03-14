import { Component } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { UtilityService } from 'src/app/shared/utility.service';

@Component({
    selector: 'admin-setting',
    templateUrl: 'admin-setting.component.html',
    styleUrls: ['admin-setting.component.scss']
})
export class AdminSettingComponent {
  constructor(
    private readonly apiSer: ApiService,
  
  ) {
  
  }
  ngOnInit() {
   
  }
}
