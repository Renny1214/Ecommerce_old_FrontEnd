import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  constructor( private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private service: AppService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.getUserInfo();

  }

  names;
  is_seller;
  newurl = "http://localhost:10083/logout/userInfo/";
  getUserInfo()
  {
      let email = sessionStorage.getItem("email");
      let temp = email.split("@");
      let emailName = temp[0];
      let emailId = temp[1].split(".")[0];
      let domain = temp[1].split(".")[1];
      let url123 = this.newurl+emailName+"/"+emailId+"/"+domain;
      this.httpClient
      .get(url123)
      .subscribe((res1 : any)=>
        {
            this.names = res1.name;
            this.is_seller = res1.seller;
            console.log(this.is_seller);
            console.log(this.names);
        }
        );
  }
  checkLogin(){
    return this.service.checkLogin();
  }

  
 login()
 {
  this.router.navigate(['/login']);
 }
 signup()
 {
  this.router.navigate(['/signup']);
 }
 red(){
  this.router.navigate(['/products']);
 }
 url1 = "http://localhost:10083/logout/logout";
 logout()
 {
   if(this.service.checkLogin())
   {
     this.authService.logoutService();
     this.httpClient.get(this.url1).subscribe(res=>
       {
           alert("Logout successful");
       });
    
     this.router.navigate(["/products"]);
   }
 }

}

