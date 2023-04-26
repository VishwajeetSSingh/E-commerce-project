import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  Category:any
  result:any;
  constructor(private api:ApiService, private router:Router){
    //this.Category=this.route.snapshot.paramMap.get("Category");
  }
  ngOnInit(): void {
    this.api.get("products").subscribe((result:any)=>{
      this.result=result;
      // console.log(result);


    })
  }

}
