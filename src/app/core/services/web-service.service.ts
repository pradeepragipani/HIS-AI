import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, finalize, map } from 'rxjs/operators';
import { GlobalComponent } from 'src/app/global-component';
import { TokenStorageService } from './token-storage.service';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class WebService {

    baseUrl = GlobalComponent.API_URL;

    constructor(
        private http: HttpClient,
        private tokenStorageService: TokenStorageService
    ) { }

    getPatientData(body: any) {
        let url = `${this.baseUrl}/PatientData?startDate=${body.startDate || ''}&endDate=${body.endDate || ''}&pageNo=${body.pageNo || ''}&pageSize=${body.pageSize || ''}&download=${body.download || 'false'}`;
        return this.http.get<any>(url, )
            .pipe(map(data => {
                return data;
            }));
    }
    blobPatientData(body: any) {
        let url = `${this.baseUrl}/PatientData?startDate=${body.startDate || ''}&endDate=${body.endDate || ''}&pageNo=${body.pageNo || ''}&pageSize=${body.pageSize || ''}&download=${body.download || 'false'}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get(url, { observe: 'response', responseType: 'blob', headers: headers }).pipe(
            catchError(this.handleError)
        );
    }
    getPatients(body: any) {
        return this.http.post<any>(this.baseUrl + `getPatients`, body)
            .pipe(map(data => {
                return data;
            }));
    }
    patientRegistration(body: any) {
        return this.http.post<any>(this.baseUrl + `patientRegistration`, body)
            .pipe(map(data => {
                return data;
            }));
    }
    uploadPaymentImage(body: any) {
        return this.http.post<any>(this.baseUrl + `uploadPaymentImage`, body)
            .pipe(map(data => {
                return data;
            }));
    }
    managePayments(body: any) {
        return this.http.post<any>(this.baseUrl + `managePayments`, body)
            .pipe(map(data => {
                return data;
            }));
    }
    getPayments(body: any) {
        return this.http.post<any>(this.baseUrl + `getPayments`, body)
            .pipe(map(data => {
                return data;
            }));
    }

    getDoctors(body: any) {
        return this.http.post<any>(this.baseUrl + `getDoctors`, body)
            .pipe(map(data => {
                return data;
            }));
    }
    DoctorRegistration(body: any) {
        return this.http.post<any>(this.baseUrl + `DoctorRegistration`, body)
            .pipe(map(data => {
                return data;
            }));
    }
    addDoctorSlots(body: any) {
        return this.http.post<any>(this.baseUrl + `addDoctorSlots`, body)
            .pipe(map(data => {
                return data;
            }));
    }
    getDoctorSlots(body: any) {
        return this.http.post<any>(this.baseUrl + `getDoctorSlots`, body)
            .pipe(map(data => {
                return data;
            }));
    }
    DoctorMaster(doctorId: any) {
        return this.http.get<any>(this.baseUrl + `DoctorMaster/` + doctorId)
            .pipe(map(data => {
                return data;
            }));
    }

    getSpecialization(body: any) {
        return this.http.post<any>(this.baseUrl + `getSpecialization`, body)
            .pipe(map(data => {
                return data;
            }));
    }
    addSpecialization(body: any) {
        return this.http.post<any>(this.baseUrl + `addSpecialization`, body)
            .pipe(map(data => {
                return data;
            }));
    }

    public handleError(error: HttpErrorResponse) {
        // if (error.error instanceof ErrorEvent) {
        // } else {
        //   console.error( `Backend returned code ${error.status}, ` + `body was: ${error.error.errorMessage}`);
        //   alert(`${error.error.errorMessage}`);
        // }
        return throwError(error.error);
    }
}
