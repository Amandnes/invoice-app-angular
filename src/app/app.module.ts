import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { FaturasComponent } from './faturas/faturas.component';
import { HttpClientModule } from '@angular/common/http';
import { FaturaDetailsComponent } from './faturas/fatura-details/fatura-details.component';
import { FaturasRoutingModule } from './faturas/faturas-routing.module';
import { FaturaListComponent } from './faturas/fatura-list/fatura-list.component';
import { DataService } from './shared/data.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    FaturasComponent, 
    FaturaDetailsComponent, 
    FaturaListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FaturasRoutingModule,
    HttpClientModule
  ],
  providers: [DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
