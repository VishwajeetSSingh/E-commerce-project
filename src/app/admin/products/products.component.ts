import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  result:any;

  load(){
    this.api.get("products").subscribe((result:any)=>{
      this.result=result;
    })
  }

    constructor(private api:ApiService){}
    ngOnInit(): void {
      this.load();
    }


    delete(id:any){
      if(confirm("Delete record")){
        this.api.delete("products/" + id ).subscribe((answer:any)=>{
          alert(" Record deleted");
          this.load();
      })
      }
  }
}
