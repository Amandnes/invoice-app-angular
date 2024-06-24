import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class DataService{

    private jsonUrl = 'https://invoice-app-9e3c4-default-rtdb.firebaseio.com/data.json'
    // private jsonUrl = 'assets/data.json'
    dados: any
    fStatus: any
    sFiltro: any
    isEdit: boolean

    constructor(private http: HttpClient) {}

    getData(): Observable<any> {
        return this.http.get<any>(this.jsonUrl).pipe()
    }

    updateData(dados: any) {
        return this.http.put(this.jsonUrl, JSON.stringify(dados)).subscribe()
    }

    filtroStatus(status: any) {
        this.fStatus = status
    }

    semFiltro(boleano: boolean) {
        this.sFiltro = boleano
    }
}