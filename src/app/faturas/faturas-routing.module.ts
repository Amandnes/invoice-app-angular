import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FaturaDetailsComponent } from "./fatura-details/fatura-details.component";
import { FaturaListComponent } from "./fatura-list/fatura-list.component";
import { FaturasComponent } from "./faturas.component";

    const routes: Routes = [
        { path: '', component: FaturasComponent, children: [
            { path: '', component: FaturaListComponent },
            { path: ':id', component: FaturaDetailsComponent }
        ] }
    ]
    
@NgModule ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class FaturasRoutingModule {}