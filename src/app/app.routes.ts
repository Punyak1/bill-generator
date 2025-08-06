import { Routes } from '@angular/router';
import { BillComponent } from './bill/bill.component'; // adjust path as needed

export const routes: Routes = [
  { path: 'bill', component: BillComponent },
  { path: '', redirectTo: 'bill', pathMatch: 'full' }, // Optional: default route
];