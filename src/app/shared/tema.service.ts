import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class TemaService{

    private jsonUrl = 'https://invoice-app-9e3c4-default-rtdb.firebaseio.com/tema.json'

    constructor(private http: HttpClient) {}

    getTema(): Observable<any> {
        return this.http.get<any>(this.jsonUrl).pipe()
    }

    updateTema(dados: any) {
        return this.http.put(this.jsonUrl, JSON.stringify(dados)).subscribe()
    }
}