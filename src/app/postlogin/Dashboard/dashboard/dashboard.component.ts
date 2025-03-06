// angular import
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/shared/api.service';
import tableData from 'src/fake-data/default-data.json';

@Component({
  selector: 'app-default',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DefaultComponent implements OnInit {


  displayedColumns: string[] = ['hclSapNo', 'name', 'createdAt', 'createdBy'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  totalHires: number = 0; // Total number of hires
  pageSize: number = 5; // Initial page size

  @ViewChild(MatPaginator) paginator: MatPaginator;

  pendingHires = [];
  AnalyticEcommerce = [
    {
      id: 'active_users',
      title: 'Active Users',
      count: '0',
      background: 'bg-light-primary ',
      border: 'border-primary',
      icon: 'rise',
      percentage: '0%',
      color: 'text-primary',
      number: '0'
    },
    {
      id: 'active_hires',
      title: 'Active Hires',
      count: '0',
      background: 'bg-light-primary ',
      border: 'border-primary',
      icon: 'rise',
      percentage: '0%',
      color: 'text-primary',
      number: '0'
    },
    {
      id: 'pending_hires',
      title: 'Pending Hires',
      count: '0',
      background: 'bg-light-warning ',
      border: 'border-warning',
      icon: 'fall',
      percentage: '0%',
      color: 'text-warning',
      number: '0'
    },
  ];

  
  transaction = [
    {
      background: 'text-success bg-light-success',
      icon: 'group-add',
      title: 'Network Setup',
      time: 'Today, 2:00 AM',
      amount: '- 100',
      percentage: '78%'
    },
    {
      background: 'text-primary bg-light-primary',
      icon: 'public',
      title: 'New Hire #984947',
      time: '5 August, 1:45 PM',
      amount: '- $302',
      percentage: '8%'
    },
    {
      background: 'text-danger bg-light-danger',
      icon: 'edit-location',
      title: 'Location Transfer #988784',
      time: '7 hours ago',
      amount: '- $682',
      percentage: '16%'
    }
  ];

  constructor(
    private readonly apiService: ApiService,
  ) {

  }
 
  ngOnInit() {
    this.getDashboardDetails();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //Get Dashboard Details
  getDashboardDetails() {
    this.apiService.getDashboardDetails({}).subscribe({
      next: (response) => {
        
        const { data: {details: detailsList } } = response || {};
        const AnalyticEcommerceTemp = this.AnalyticEcommerce;
        const AnalyticEcommerceNew = AnalyticEcommerceTemp.map((item) => {
          if (item.id === 'active_users') {
            item.count = detailsList?.totalCounts?.activeUsers || 0;
            item.number = detailsList?.activityCount?.activeUsers?.count || 0;
            item.percentage = `${detailsList?.activityCount?.activeUsers?.percentage || 0}%`;
          } 
          if (item.id === 'active_hires') {
            item.count = detailsList?.totalCounts?.activeHires || 0;
            item.number = detailsList?.activityCount?.activeHires?.count || 0;
            item.percentage = `${detailsList?.activityCount?.activeHires?.percentage || 0}%`;
          }
          if (item.id === 'pending_hires') {
            item.count = detailsList?.totalCounts?.pendingHires || 0;
            item.number = detailsList?.activityCount?.pendingHires?.count || 0;
            item.percentage = `${detailsList?.activityCount?.pendingHires?.percentage || 0}%`;
            
          }
          return item;
        });
        this.AnalyticEcommerce = AnalyticEcommerceNew;
        this.pendingHires = detailsList?.pendingHires || [];
        this.dataSource.data = this.pendingHires;
        this.totalHires = this.pendingHires.length;
      },
      error: (error) => {
        const { message: errorMessage } = error;
      }
    });
  }
 
}
