import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontPageComponent } from './front-page/front-page.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  
 {path : 'home' , component :FrontPageComponent},
 {path : 'login' , component : LogInComponent},
 {path : 'signup' , component : SignUpComponent},
 {path : 'products' , component : HomePageComponent},
 {path : 'products/id/:id' , component : ProductDetailsComponent},
 {path : 'cart' , component : UserCartComponent},
 {path : 'profile' , component : MyprofileComponent},
 {path : 'history' , component : HistoryComponent},
 {path:'',redirectTo: "/home" , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
