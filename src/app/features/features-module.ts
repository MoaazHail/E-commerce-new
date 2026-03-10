import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './home/home';
import { Cart } from './cart/cart';
import { ProductDetails } from './product-details/product-details';



@NgModule({
  declarations: [
    Home,
    Cart,
    ProductDetails
  ],
  imports: [
    CommonModule
  ]
})
export class FeaturesModule { }
