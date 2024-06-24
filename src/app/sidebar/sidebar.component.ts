import { Component, OnInit } from '@angular/core';
import { TemaService } from '../shared/tema.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  srcIcon: string = ''
  qTema: any

  constructor(private temaService: TemaService) {
    this.temaService.getTema().subscribe((tema:any) => {
      this.qTema = tema
    })
  }

  ngOnInit(): void {
    setTimeout(() => {
      if(this.qTema === 'dark') {
        this.srcIcon = 'assets/img/icon-sun.svg'
      } else{
        this.srcIcon = 'assets/img/icon-moon.svg'
      }
    }, 300)
  }

  trocarTema() {
    if(this.qTema === 'clean') {
      this.srcIcon = 'assets/img/icon-sun.svg'
      this.temaService.updateTema('dark')
    } else {
      this.srcIcon = 'assets/img/icon-moon.svg'
      this.temaService.updateTema('clean')
    }
  }
}
