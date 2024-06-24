import { NgModule } from "@angular/core";
import { NovaFaturaComponent } from "./nova-fatura.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { DataService } from "../shared/data.service";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
    { path: 'new-invoice', component: NovaFaturaComponent }
]
@NgModule({
    declarations: [
        NovaFaturaComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [DataService]
})

export class NovaFaturaModule{}