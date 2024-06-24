import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fatura-list',
  templateUrl: './fatura-list.component.html',
  styleUrl: './fatura-list.component.css'
})
export class FaturaListComponent implements OnInit, OnDestroy {

  dataJson: any[] = []
  sub: Subscription

  constructor(private dataService: DataService) {}

  ngOnInit() {
    setTimeout(() => {
      this.sub = this.dataService.getData().subscribe(dados => {
        this.dataJson = dados
      })
    }, 250)

  }

  styleStatus(status: any) {
    if(status === 'paid') {
      return 'stylePd'
    } else if(status === 'pending') {
      return 'stylePg'
    } else {
      return 'styleDt'
    }
  }

  filtroDados() {
    return this.dataJson.filter((dados: any) => {
      if(dados.status === this.dataService.fStatus) {
        return dados
      } else if(this.dataService.fStatus === undefined || this.dataService.sFiltro) {
        return dados
      }
    })
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }
}
