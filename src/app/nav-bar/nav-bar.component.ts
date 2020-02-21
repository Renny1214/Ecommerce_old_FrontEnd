import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  username;
  password;
  constructor(private httpClient : HttpClient , private router: Router , private route : ActivatedRoute ,private service : AppService ,private authService:AuthenticationService) { }

  ngOnInit() {
  }

  url = "http://localhost:10083/logout/logout";
  logout()
  {
    if(this.service.checkLogin())
    {
      this.authService.logoutService();
      this.httpClient.get(this.url).subscribe(res=>
        {
            alert("logout successful");
        });
      alert("Logout Successful");
      this.router.navigate(["/products"]);
    }
  }

  checkLogin(){
    return this.service.checkLogin();
  }
}
