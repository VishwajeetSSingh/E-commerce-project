import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './addItems.component.html',
  styleUrls: ['./addItems.component.css']
})
export class AddItemsComponent implements OnInit{
  information:any;

  id:any;


  constructor(private api:ApiService, private router:Router,private route:ActivatedRoute){
    this.id=this.route.snapshot.paramMap.get("id")}

  ngOnInit(): void {
    this.information = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required])),
      MRP: new FormControl( 0, Validators.compose([Validators.required])),
      Price: new FormControl(0, Validators.compose([Validators.required])),
      Image: new FormControl("", Validators.compose([Validators.required])),
      Description: new FormControl("", Validators.compose([Validators.required])),
      category: new FormControl("", Validators.compose([Validators.required])),
      IsValid: new FormControl(false, Validators.compose([Validators.required]))
    });
    if(this.id !=null){
      this.api.get("/products/" + this.id).subscribe((result:any)=>{
        this.information.patchValue({
          name:result.name,
          MRP:result.MRP ,
          Price:result.Price,
          Image:result.Image,
          Description:result.Description,
          IsValid:result.IsValid,
          category:result.category

        })
      })
    }
  }


  Save(data:any){
    if(this.id==null){
      this.api.post("products", data).subscribe((result:any)=>{
        this.router.navigate(['/admin/products']);

      })
    }
    else {
      this.api.put("products/" + this.id, data).subscribe((result:any)=>{
        this.router.navigate(['/admin/products']);
      })
    }
  }
  
}
