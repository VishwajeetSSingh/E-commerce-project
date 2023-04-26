import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

declare var Razorpay:any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  products:any;
  total:any;
  formdata:any;
  id=0;
  order:any;

  options = {
  "key": "rzp_live_Ay9af2dQeUH8A6", // Enter the Key ID generated from the Dashboard
  "amount": "200", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  "currency": "INR",
  "name": "Vishwajeet Enterprises", //your business name
  "description": "Order placed on ecommerce",
  "image": "https://igaptechnologies.com/assets/logo/igap.png",
  "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",

  "handler": function (response:any){
    console.log(response);

    var event = new CustomEvent('payment.success',{detail:response, bubbles:true, cancelable:true});
    window.dispatchEvent(event);
    // alert(response.razorpay_payment_id);
    // alert(response.razorpay_order_id);
    // alert(response.razorpay_signature)
  },

  "prefill": {
      "name": "Vishwajeet Singh", //your customer's name
      "email": "mr.vishu1111@gmail.com",
      "contact": "9890149865"
  },
  "notes": {
      "address": "Razorpay Corporate Office"
  },
  "theme": {
      "color": "#3399cc"
  }
};

  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.products =JSON.parse(localStorage.getItem("products") || "[]");
    this.calculateTotal();

    this.formdata = new FormGroup({
      name : new FormControl("",Validators.compose([Validators.required])),
      address : new FormControl("",Validators.compose([Validators.required])),
      city : new FormControl("",Validators.compose([Validators.required])),
      pincode : new FormControl("",Validators.compose([Validators.required])),
      mobno : new FormControl("",Validators.compose([Validators.required])),
      email : new FormControl("",Validators.compose([Validators.required])),
    });


  }

  calculateTotal(){
    this.total=0;
    this.products.map((product:any)=>{
      this.total +=
       product.quantity * product.Price;
    });
  }

 placeOrder(){
  this.order = {...this.formdata.value, products:this.products, total:this.total, status:"unpaid"};
  //  console.log(order);
  this.api.post("orders",this.order).subscribe((result:any)=>{
    this.id = result.id;
    console.log(this.id);

    //Start payment Gateway

    this.options.amount = (this.total * 100).toString();
    this.options.prefill.name = this.order.name;
    this.options.prefill.email = this.order.email;
    this.options.prefill.contact = this.order.mobno;
    var razorpay = new Razorpay(this.options);
    razorpay.open();
    razorpay.on('payment.failed',(response:any)=>{
      alert("Payment Failed");
    });
  })
 }

 @HostListener('window:payment.success', ['$event'])
 onPaymentSuccess(event:any):void{
 console.log("Payment Received");
 this.api.put("/orders/"+ this.id,{...this.order,status:"paid"}).subscribe((result:any)=>{
 console.log("Status Updated");
 console.log(result);
 Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Oredr Placed Successfully',
  showConfirmButton: false,
  timer: 1500
})
  })
 }

}
