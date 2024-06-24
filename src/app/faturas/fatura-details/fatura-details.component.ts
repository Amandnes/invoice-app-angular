import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fatura-details',
  templateUrl: './fatura-details.component.html',
  styleUrl: './fatura-details.component.css'
})
export class FaturaDetailsComponent implements OnInit, OnDestroy {

  faturaSelecionada: any = []
  getData: any
  sub: Subscription
  isLoad: boolean = false
  index: number
  
  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) {
  }
  
  ngOnInit() {
    this.sub = this.dataService.getData().subscribe(dados => {
      this.getData = dados
      this.getData.forEach((element: any, i: number) => {
        if(this.router.url.substring(1) === element.id) {
          this.faturaSelecionada = element
          this.index = i
        }
      })

    })

    setTimeout(() => {
      this.isLoad = true
    }, 250)
  }

  markPaid() {
    this.faturaSelecionada.status = 'paid'
    this.dataService.updateData(this.getData)
  }

  onDelete() {
    this.getData.splice(this.index, 1)
    this.dataService.updateData(this.getData)
    this.router.navigate(['/'])
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route})
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

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }
}
