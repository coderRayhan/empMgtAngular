import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http"
import { Observable } from "rxjs";

@Injectable()
export class restDataService{
    constructor(private http : HttpClient){}
    
    // baseUrl : string;
    // body : any;

    postData(baseUrl :string, body: any) : Observable<any>{
        return this.http.post(baseUrl, body);
    }

    getData(baseUrl : string) : Observable<any[]>{
        return this.http.get<any[]>(baseUrl);
    }

    putData(baseUrl : string, body : any) : Observable<any>{
        return this.http.put(baseUrl, body);
    }

    deleteData(id : number, baseUrl : string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}