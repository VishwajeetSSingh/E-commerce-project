import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formdata:any;

  constructor(private api:ApiService, private router:Router, private toaster:ToastrService){}
  ngOnInit(): void {
    this.formdata = new FormGroup({
      username:new FormControl("",Validators.compose([Validators.required])),
      password:new FormControl("",Validators.compose([Validators.required]))
    })
  }

  save(data:any){
    if(data.username=="admin" && data.password=="admin"){
    localStorage.setItem("usertype","admin")
      this.router.navigate(['/admin'])
      this.toaster.success("Logged In", "Success");
  }
  else{
    this.toaster.error("Invalid Login Details", "Error");
    }
  }
}

