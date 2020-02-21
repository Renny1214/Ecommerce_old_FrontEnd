import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BelowBarComponent } from './below-bar/below-bar.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { HistoryComponent } from './history/history.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LogInComponent } from './log-in/log-in.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    BelowBarComponent,
    FrontPageComponent,
    HistoryComponent,
    HomePageComponent,
    LogInComponent,
    MyprofileComponent,
    NavBarComponent,
    ProductDetailsComponent,
    SignUpComponent,
    TopBarComponent,
    UserCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
