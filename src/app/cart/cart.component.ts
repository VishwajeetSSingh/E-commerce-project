import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  products:any;
  total=0;
  // array=new Array();


  constructor(private api:ApiService){}
  ngOnInit(): void {
   this.products =JSON.parse(localStorage.getItem("products") || "[]");
    this.calculateTotal();
    console.log(this.products);
    // console.log(this.products.avatar);


  }

  calculateTotal(){
    this.total=0;
    this.products.map((product:any)=>{
      this.total +=
       product.quantity * product.Price;
    });
  }

  deleteProduct(product:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.products = this.products.filter((p:any)=>{
          if(product.id != p.id){
            return p;
          }
        })
        this.api.updateCounterValue(this.products.length);
        localStorage.setItem("products", JSON.stringify(this.products));
         this.calculateTotal();
      }
    })


  }

  keypressed(event:any){
    if(event.code==45){
      return false;
    }
    else{
      return false;
    }
  }

  qtychanged(){
    localStorage.setItem("products", JSON.stringify(this.products));
    this.calculateTotal();
  }

}
