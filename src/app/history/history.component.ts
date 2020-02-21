import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor( private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private service: AppService,
    private authService: AuthenticationService) {  
   }
   historyUrl = "http://localhost:10083/history";
  ngOnInit() {
    if(!this.service.checkLogin())
    {
      this.router.navigate(["/home"]);
    }
    this.ajaxCall(this.historyUrl);
  }
array;
historyId;
historyDate;
historProducts = [];
users =[];
  ajaxCall(url){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({Authorization: 'Basic '+token});
    this.httpClient.get(url,{headers}).subscribe(res => {
      this.array = res;
      console.log(res);
      this.array.forEach(element => {
        this.historyId = element.productId;
        this.historyDate = element.name;
        this.historProducts = element.products;
        
        this.users = element.users; 
      });
    });
  }

 
  checkLogin() {
    return this.service.checkLogin();
  }

  red() {
    this.router.navigate(["/products"]);
  }

  goToCart()
  {
    this.router.navigate(["/cart"]);
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
}
