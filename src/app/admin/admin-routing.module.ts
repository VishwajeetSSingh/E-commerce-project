import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddItemsComponent } from './addItems/addItems.component';
import { ProductsComponent } from './products/products.component';
import { LandingComponent } from './landing/landing.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {path:"",component:LandingComponent ,children:[
    {path:"dashboard",component:DashboardComponent},
   {path:"addItems",component:AddItemsComponent},
   {path:"products",component:ProductsComponent},
   {path:"orders", component:OrdersComponent},
   {path:"addItems/:id",component:AddItemsComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
