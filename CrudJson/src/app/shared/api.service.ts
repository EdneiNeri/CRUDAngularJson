import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postEmploye(data : any){
    return this.http.post<any>("http://localhost:3000/clientes", data)
    .pipe(map((res: any) =>{
      return res;
    }))
  }
  getEmployee(){
    return this.http.get<any>("http://localhost:3000/clientes")
    .pipe(map((res: any) =>{
      return res;
    }))
  }
  updateEmploye(data :any, id: number){
    return this.http.put<any>("http://localhost:3000/clientes/"+id,data)
    .pipe(map((res: any) =>{
      return res;
    }))
  }
  deleteEmployee(id: number){
    return this.http.delete<any>("http://localhost:3000/clientes/"+id)
    .pipe(map((res: any) =>{
      return res;
    }))
  }
}
