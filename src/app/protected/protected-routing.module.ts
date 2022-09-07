import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddheroComponent } from './addhero/addhero.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditheroComponent } from './edithero/edithero.component';

const routes: Routes = [
  {
    path: '', 
    children: [
      { path: '', component: DashboardComponent },
      { path: 'edit/:id', component: EditheroComponent },
      { path: 'add', component: AddheroComponent },
      { path: '**', redirectTo: '' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
