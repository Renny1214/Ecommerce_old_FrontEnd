import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { AppService } from "../app.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.css"]
})
export class LogInComponent implements OnInit {
  email;
  password;
  id;
  constructor(
    private httpClient: HttpClient,
    private service: AppService,
    private router: Router,
    private authService: AuthenticationService
  ) {}
   
  newurl = "http://localhost:10083/logout/userInfo/"; 
  ngOnInit() {
  if(this.service.checkLogin())
  {
    this.router.navigate(['home']);
  }
  }
  validateUser= true;
  login() {
    if(this.email==undefined||this.password==undefined)
    {
      this.validateUser=false;
    }
    else{
      this.validateUser=true;
    }
    console.log(this.validateUser);
    if(this.validateUser){
    sessionStorage.setItem("email",this.email);
      this.authService
      .authenticate(this.email, this.password)
      .subscribe(data => {
        this.service.isLoggedIn(true);
        this.router.navigate(["products"]);
      },error=>
      {
        this.validateUser=false;
      });
    }
  }
  showPassword="password";
  showPasswordFunction()
  {
    if(this.showPassword=="password")
    {
        this.showPassword="text";
    }else{
      this.showPassword="password";
    }

  }
  url1 = "http://localhost:10083/logout/logout";
  logout() {
    if (this.service.checkLogin()) {
      this.authService.logoutService();
      this.httpClient.get(this.url1).subscribe(res => {
        alert("logout successful");
      });
      alert("Logout Successful");
      this.router.navigate(["/products"]);
    }
  }

  checkLogin() {
    return this.service.checkLogin();
  }

  red() {
    this.router.navigate(["/products"]);
  }

  
}
