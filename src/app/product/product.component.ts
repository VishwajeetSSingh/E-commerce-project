import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit{
  id:any;
  result:any;
  qty = 1 ;
  products=new Array();
  cart = 0





constructor(private api:ApiService, private router:Router, private route:ActivatedRoute,private toaster: ToastrService){
  this.id = this.route.snapshot.paramMap.get("id")
}
  ngOnInit(): void {
    this.api.currentCounterValue.subscribe((count:any)=>{
      this.cart =count;
    })

    this.api.get("/products/"+this.id).subscribe((result:any)=>{
      this.result=result;


    })
  }

  AddToCart(){
  let pro={id:this.result.id,name:this.result.name,Price:this.result.Price,category:this.result.catagory,isvalid:this.result.IsValid,available:this.result.Available,quantity:this.qty,avatar:this.result.avatar};

this.products = JSON.parse(localStorage.getItem("products") || '[]');
   let ProductAdded=false;
    for(let i =0;i < this.products.length;i++){
      if(this.products[i].id==pro.id){
        ProductAdded=true;
        break;
      }
    }
    if(!ProductAdded){
      this.products.push(pro);

     localStorage.setItem("products", JSON.stringify(this.products));
     this.api.updateCounterValue(this.products.length);

     this.toaster.success("Item Added To Cart", "Success");

    }
    else{
    this.toaster.error("Item Already Exist", "Error");
  }
  }

  minus(){
    if(this.qty>1){
      this.qty --;

    }
  }

  plus(){
    this.qty ++;

  }
}
