import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { WebService } from 'src/app/core/services/web-service.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  private destroy$ = new Subject<void>();
  isLoading: boolean = false;

  totalItems: number;
  currentPage: number = 1;
  itemsPerPage: number = 50;
  patientList: any[] = [];
  selectedRange = [];
  todayDate = new Date();
  startDate: Date | null = null;
  endDate: Date | null = null;

  rowClasses = ['', 'table-primary', 'table-secondary', 'table-success', 'table-danger', 'table-warning', 'table-info', 'table-light', 'table-dark', ''];

  constructor(
    private router: Router,
    private webService: WebService,
  ) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Patient Reports' }, { label: 'List', active: true }];
  }

  getPatientData(download?: boolean) {
    if (!this.startDate || !this.endDate) {
      return;
    }
    let body = {
      startDate: this.getFormattedDate(this.startDate),
      endDate: this.getFormattedDate(this.endDate),
      pageNo: this.currentPage,
      pageSize: this.itemsPerPage,
      download: download || false,
    };
    this.isLoading = true;
    if (download) {
      this.webService.blobPatientData(body)
        .subscribe({
          next: (res: any) => {
            console.log(res);
            this.isLoading = false;
            var blob = new Blob([res.body], { type: res.body.toString() });
            var url = window.URL.createObjectURL(blob);
            var anchor = document.createElement("a");
            anchor.download = "Patient-Data-" + new Date().getTime() + ".xlsx";
            anchor.href = url;
            anchor.click();
          }, error: (error: any) => {
            this.isLoading = false;
          }, complete: () => {
            this.isLoading = false;
          }
        });
    } else {
      this.webService.getPatientData(body)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res: any) => {
            this.isLoading = false;
            this.patientList = res.invoices;
            this.totalItems = res.totalCount;
          }, error: (error: any) => {
            this.isLoading = false;
          }, complete: () => {
            this.isLoading = false;
          }
        });
    }
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
    this.getPatientData();
  }

  gotoOrders(patient: any) {
    localStorage.setItem('patient-details', JSON.stringify(patient));
    this.router.navigate(['/patients/orders/' + patient.id]);
  }

  onValueChange(event: any) {
    this.startDate = event[0];
    this.endDate = event[1];
    this.getPatientData();
  }
  onstartDateChange(event: any) {
    this.startDate = event;
    this.endDate = null;
    // this.getPatientData();
  }
  onendDateChange(event: any) {
    this.endDate = event;
    // this.getPatientData();
  }

  getFormattedDate(date: Date) {
    let dateStr = '';
    if (date) {
      dateStr = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate());
    }
    return dateStr;
  }

  resetFilters() {
    this.startDate = null;
    this.endDate = null;
    this.getPatientData();
  }

  search() {
    this.getPatientData();
  }
}
