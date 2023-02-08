import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class StudentService {
  BASE_URL = environment.SERVER_URL + "/students";

  constructor(
      private http: HttpClient,
      private router: Router
  ){}

  // createInvestor(filters){
  //   const httpOptions = {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json'
  //       })
  //   };
  //   const body = JSON.stringify(filters);
  //   return this.http.post(this.BASE_URL + '/createInvestor', body, httpOptions).toPromise();
  // }

  // login(email, password){
  //   let params = new HttpParams()
  //     .set('email', email)
  //     .set('password', password);
  //   return this.http.get(this.BASE_URL + '/login', { params });
  // }

  getDetails(){
    return this.http.get(this.BASE_URL + '/',{ withCredentials: true }).toPromise();
  }

  editStudent(data,id){
    console.log(id);
    return this.http.put<any>(this.BASE_URL + '/'+id, data).toPromise();
  }

}
