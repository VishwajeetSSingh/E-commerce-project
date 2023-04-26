import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

count=0;

  isLogIn : boolean = true;
  isLogOut : boolean = false;

  changeValue()
  {
    this.isLogIn = !this.isLogIn;
    localStorage.clear();
    this.router.navigate(["/login"]);

  }



constructor(private api:ApiService, private router:Router){

  this.api.currentCounterValue.subscribe((res:any)=>{
    console.log(res);

    this.count=res;
  })
}
  ngOnInit(): void {
    if(localStorage.getItem("products")!=null){
    let trd=JSON.parse(localStorage.getItem("products") || "[]");
    this.count=trd.length;
    }

  }


}
