import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //  loginSuccess =false;

  baseurl:any="https://6423f88747401740432fc425.mockapi.io/api/v1/";
  constructor(private http:HttpClient) { }

  get(path:any){
    return this.http.get(this.baseurl + path)
  }
  delete(path:any){
    return this.http.delete(this.baseurl + path)
  }
  post(path:any, data:any){
    return this.http.post(this.baseurl + path,data)
  }
  put(path:any, data:any){
    return this.http.put(this.baseurl + path,data)
  }

  private counterValue = new BehaviorSubject(0);
  currentCounterValue = this.counterValue.asObservable();

  updateCounterValue(count:number){
    this.counterValue.next(count);
  }

  // validateuser(username:any,password:any)
  // {
  //   if(username=='admin' && password=='admin')
  //   {
  //     this.loginSuccess = true;

  //     return true;
  //   }
  //   else{
  //     return false;
  //   }

  // }

}
