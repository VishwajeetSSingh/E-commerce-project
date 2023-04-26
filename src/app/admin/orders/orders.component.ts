import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})


export class OrdersComponent implements OnInit{
  result:any;
  constructor(private api:ApiService){

  }

  ngOnInit(): void {
    this.api.get("orders").subscribe((result:any)=>{
      this.result = result;
      console.log(this.result);
      

    })
  }

}
