import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';


const routes: Routes = [
    {
        path: "",
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: PatientListComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientsRoutingModule { }
