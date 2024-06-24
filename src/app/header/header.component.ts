import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  statusFiltro = false
  qtdInvoice: any = 'There are 0 total invoices'
  draftF: boolean = false
  pendingF: boolean = false
  paidF: boolean = false

  constructor(private dataService: DataService) {
    setTimeout(() => {
      this.dataService.getData().subscribe(dados => {
        this.qtdInvoice = `There are ${dados.length} total invoices`
      })
    }, 250)
    
  }

  ngOnInit() {}

  status(status: any) {
    if(status === 'paid') {
      this.paidF = !this.paidF
      this.pendingF = false
      this.draftF = false
    } else if( status === 'draft') {
      this.draftF = !this.draftF
      this.paidF = false
      this.pendingF = false
    } else {
      this.pendingF = !this.pendingF
      this.draftF = false
      this.paidF = false
    }

    if(this.paidF === false && this.pendingF === false && this.draftF  === false) {
      this.dataService.semFiltro(true)
    } else {
      this.dataService.semFiltro(false)
    }
  }
}
