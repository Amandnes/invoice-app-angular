import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NovaFaturaComponent } from './nova-fatura/nova-fatura.component';

const routes: Routes = [
  { path: 'new-invoice', component: NovaFaturaComponent },
  { path: ':id/edit', component: NovaFaturaComponent,
  loadChildren: () => import('./nova-fatura/nova-fatura.module').then(m => m.NovaFaturaModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }