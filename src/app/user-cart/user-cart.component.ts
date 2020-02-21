import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { element } from 'protractor';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  
  constructor(private httpClient :HttpClient, private service : AppService , private router : Router) { }

  getUrl= "http://localhost:10083/cart";
  removeUrl =  "http://localhost:10083/cart/deleteItem/productId/";
  incrementUrl = "http://localhost:10083/cart/increment/productId/"; 
  decrementUrl="http://localhost:10083/cart/decrement/productId/" ;
  cartArray;
  ngOnInit() {
    if(!(this.service.checkLogin()))
    {
      this.router.navigate(['/products']);
    }
    this.ajaxCall(this.getUrl);
  }
  totalprice=0;
  delivery =150;
  tax= 50;
  finalprice;
  ajaxCall(geturl)
  {
      const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders({Authorization: 'Basic '+token});

      this.httpClient.get(geturl,{headers}).subscribe(res=>
      {
           let total =0;
            this.cartArray = res; 
            this.cartArray.forEach(element=>
            {
                let quantity = element.quantity;
                total = total + (quantity*element.products.price);
              });

              this.totalprice = total;

              this.tax = 60;
            this.delivery =150;

            this.finalprice =  total + (this.tax) +(this.delivery);
      });

  }
 
  increment(productId)
  {
      const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders({Authorization: 'Basic '+token});

      this.httpClient.get(this.incrementUrl+productId,{headers}).subscribe(res=>
      {
        this.ajaxCall(this.getUrl);
      });
  }
  decrement(productId)
  {
    this.cartArray.forEach(element => {
      let product = element.products;
  
    if(product.productId == productId)
    {
      if(element.quantity>1)
      {
      const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders({Authorization: 'Basic '+token});

      this.httpClient.get(this.decrementUrl+productId,{headers}).subscribe(res=>
      {
           this.ajaxCall(this.getUrl);
      });
      return ;
    }
    }

    });
  }
  remove(productId)
  {
      const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders({Authorization: 'Basic '+token});

      this.httpClient.get(this.removeUrl+productId,{headers}).subscribe(res=>
      {
        this.ajaxCall(this.getUrl);
      });
  }
  history=false;
  addHistoryUrl="http://localhost:10083/history/addHistory";
  addToHistory()
  {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({Authorization: 'Basic '+token});

    this.httpClient.get(this.addHistoryUrl,{headers}).subscribe(res=>
    {
      this.history = true;
      this.ajaxCall(this.getUrl);
    });
  }
  
}
