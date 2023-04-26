import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  formdata:any;
  category:any;
  pageYoffset = 0;

  constructor(private api:ApiService, private route:ActivatedRoute, private scroll: ViewportScroller){
    this.category=this.route.snapshot.paramMap.get("category");
  };

  ngOnInit(): void {
    this.api.get("/products").subscribe((reply:any)=>{
      this.formdata=reply;

      if(this.category !=null){
        this.formdata= this.formdata.filter((data:any)=>{
          if(data.category==this.category){
            return data;
          }
        })
      }

    })
  }
  @HostListener('window:scroll', ['$event']) onScroll(){
    this.pageYoffset = window.pageYOffset;
 }


scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
}
}
