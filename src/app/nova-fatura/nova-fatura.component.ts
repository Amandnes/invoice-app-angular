import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import moment from 'moment';
import { DataService } from '../shared/data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-nova-fatura',
  templateUrl: './nova-fatura.component.html',
  styleUrl: './nova-fatura.component.css'
})
export class NovaFaturaComponent implements OnInit {
  @ViewChild('osItems') osItems!: ElementRef<any>
  isLoad: boolean = false
  faturaSelecionada: any
  faturas: FormGroup
  saveDraft: boolean = false
  editar: boolean = false
  id: any 
  data: any
  qFatura = "Edit #"
  isAddNewItem = false
  indexFatura: number

  constructor(private dataService: DataService, private router: Router, 
    private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      this.editar = params['id'] != null
      this.qFatura += this.id
    })

    this.dataService.getData().subscribe(dados => {
      this.data = dados
      if(this.editar) {
        dados.forEach((e: any, i: number) => {
          if(e.id === this.id) {
            this.faturaSelecionada = e
            this.indexFatura = i
          }
        })
      }
    })

    this.initForm()
  }

  get itemsControl() {
    return (this.faturas.get('items') as FormArray).controls;
  }

  private initForm() {
    if(this.editar) {
      setTimeout(() => {
        this.isLoad = true
        this.dadosForm()
      }, 300)
    } else {
      this.isLoad = true
      this.dadosForm()
    }
  }

  private dadosForm() {
    this.faturas = new FormGroup({
      id: new FormControl(this.editar? this.faturaSelecionada.id : this.gerarId()),
      createdAt: new FormControl(moment().format('YYYY-MM-DD')),
      paymentDue: new FormControl(this.editar? moment(this.faturaSelecionada.paymentDue).format('DD/MM/YYYY') : ''),
      description: new FormControl(this.editar? this.faturaSelecionada.description : ''),
      paymentTerms: new FormControl(this.editar? this.faturaSelecionada.paymentTerms : ''),
      clientName: new FormControl(this.editar? this.faturaSelecionada.clientName : ''),
      clientEmail: new FormControl(this.editar? this.faturaSelecionada.clientEmail : ''),
      status: new FormControl(this.editar? this.faturaSelecionada.status : 'pending'),
      senderAddress: new FormGroup({
        street: new FormControl(this.editar? this.faturaSelecionada.senderAddress.street : ''), 
        city: new FormControl(this.editar? this.faturaSelecionada.senderAddress.city : ''),
        postCode: new FormControl(this.editar? this.faturaSelecionada.senderAddress.postCode : ''),
        country: new FormControl(this.editar? this.faturaSelecionada.senderAddress.country : ''),
      }),
      clientAddress: new FormGroup({
        street: new FormControl(this.editar? this.faturaSelecionada.clientAddress.street : ''),
        city: new FormControl(this.editar? this.faturaSelecionada.clientAddress.city : ''),
        postCode: new FormControl(this.editar? this.faturaSelecionada.clientAddress.postCode : ''),
        country: new FormControl(this.editar? this.faturaSelecionada.clientAddress.country : ''),
      }),
      items: new FormArray([]),
      total: new FormControl(this.editar? this.faturaSelecionada.total : 0)
    })

    if(this.editar) {
        if(this.faturaSelecionada.items.length > 0) {
          this.faturaSelecionada.items.forEach((e: any) => {
            (<FormArray>this.faturas.get('items')).push(
              new FormGroup({
                name: new FormControl(e.name),
                quantity: new FormControl(e.quantity),
                price: new FormControl(e.price),
                total: new FormControl(e.total)
              })
            )
          })
        }
    }
  }

  gerarId() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetter1 = letters.charAt(Math.floor(Math.random() * letters.length));
    const randomLetter2 = letters.charAt(Math.floor(Math.random() * letters.length));
    const randomNumber = Math.floor(1000 + Math.random() * 9000).toString();
    return `${randomLetter1}${randomLetter2}${randomNumber}`;
  }

  onSubmit() {
    this.faturas.value.paymentDue = moment(this.faturas.value.paymentDue, 'DD/MM/YYYY').format('YYYY-MM-DD')
    // PaymentDue tem que somar com os dias do PaymentTerms
    if(this.saveDraft) {
      this.faturas.value.status = 'draft'
    }

    this.faturas.value.total = 0
    this.faturas.value.items.forEach((items: any) => {
      items.total = items.quantity * items.price
      this.faturas.value.total += parseFloat(items.total) 
    })

    if(this.editar) {
      this.data.splice(this.indexFatura, 1, this.faturas.value)
    } else {
      this.data.splice(0, 1, this.faturas.value, this.data[0])
    }
    this.dataService.updateData(this.data)
    this.botaoVoltar()
  }

  addNewItem() {
    (<FormArray>this.faturas.get('items')).push(
      new FormGroup({
        name: new FormControl(''),
        quantity: new FormControl(''),
        price: new FormControl(''),
        total: new FormControl('')
      })
    )

    this.isAddNewItem = true
  }

  deletarItem(index: number) {
    (<FormArray>this.faturas.get('items')).removeAt(index)
    this.isAddNewItem = true
  }

  botaoVoltar() {
    if(this.editar) {
      this.router.navigate([`/${this.faturaSelecionada.id}`])
    } else {
      this.router.navigate(['/'])
    }
  }
}
