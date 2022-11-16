import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UserService {
  BASE_URL = environment.SERVER_URL + "/user";
  tokenSubject = new Subject<string>();

  constructor(
      private http: HttpClient,
      private router: Router
  ){}

  createInvestor(filters){
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };
    const body = JSON.stringify(filters);
    return this.http.post(this.BASE_URL + '/createInvestor', body, httpOptions).toPromise();
  }

  login(email, password){
    let params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.get(this.BASE_URL + '/login', { params });
  }

  setToken(token){
    this.tokenSubject.next(token);
  }

  currentUserToken(){
    const ret = {
      user_token:localStorage.getItem("user_token"),
      name: localStorage.getItem("name"),
      type: localStorage.getItem("type")
    }
    return ret;
  }

  logout(){
    localStorage.clear();
    this.tokenSubject.next("");
    this.router.navigate(['/signin'])
  }

}
