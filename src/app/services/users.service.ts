import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UserService {
  BASE_URL = environment.SERVER_URL;
  // tokenSubject = new Subject<string>();
  logged:boolean=false;
  logObserver: Subject<boolean> = new Subject<boolean>();
  private _isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticatedObs: Observable<boolean> = this._isAuthenticatedSubject.asObservable();

  constructor(
      private http: HttpClient,
      private router: Router
  ){
    this.logObserver.subscribe((value) => {
      this.logged = value
  });
  }

  // login(email, password){
  //   let params = new HttpParams()
  //     .set('email', email)
  //     .set('password', password);
  //   return this.http.get(this.BASE_URL + '/login', { params });

  login(details){
    let params = new HttpParams({
      fromObject: details,
    });
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        }),
        withCredentials: true
    };
    const body = params.toString();
    return this.http.post(this.BASE_URL + '/login', body, httpOptions).toPromise();
  }

  loggedIn(){
    this._isAuthenticatedSubject.next(true); // authenticated
    this.logged=true;
    console.log(this.logged);

  }

  isLoggedIn(){
    return this.logged;
  }

  // setToken(token){
    //   this.tokenSubject.next(token);
    // }

    // currentUserToken(){
      //   const ret = {
        //     user_token:localStorage.getItem("user_token"),
        //     name: localStorage.getItem("name"),
        //     type: localStorage.getItem("type")
        //   }
        //   return ret;
        // }

  logout(){
      // localStorage.clear();
      // this.tokenSubject.next("");
    this.logged=false;
    this._isAuthenticatedSubject.next(false);
    this.router.navigate(['/signin']);
  }

}
