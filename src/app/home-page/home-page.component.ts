import { Component, OnInit, Output,EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {

  url = "http://localhost:10083/products/showProducts";
  name;
  array;
  price;
  category;
  subcategory;
  image;
  productId;
  brand;
  isActive;
  details = [];

  names;
  is_seller;
  constructor(private httpClient : HttpClient , private router: Router , private route : ActivatedRoute ,private service : AppService ,private authService:AuthenticationService,private formBuilder: FormBuilder) {}
  
  registerForm: FormGroup;
  submitted = false;

  newurl = "http://localhost:10083/logout/userInfo/";
  ngOnInit() {
    this.ajaxCall(this.url);
    this.getUserInfo();

    this.registerForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productBrand: ['', Validators.required],
      productCategory: ['', Validators.required],
      productSubcategory: ['', Validators.required],
      productImage: ['', Validators.required],
      productDetails: ['', Validators.required],  
  });
  }
  get f() { return this.registerForm.controls; }


  checkCategorySelected()
  {
    if(this.categorySelected!="")
    {
      return true;
    }
    else{
      return false;
    }
  }

  checkSubCategorySelected()
  {
    if(this.subcategorySelected!="")
    {
      return true;
    }
    else{
      return false;
    }
  }
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
      .subscribe((res1: any)=>
        {
            this.names = res1.name;
            this.is_seller = res1.seller;
            console.log(this.is_seller);
            console.log(this.names);
        }
        );
  }

  ajaxCall(url){
    this.httpClient.get(url).subscribe(res => {
      this.array = res;
      console.log(res);
      this.array.forEach(element => {
        this.productId = element.productId;
        this.name = element.name;
        this.price = element.price;
        this.category = element.category;
        this.subcategory = element.subcategory;
        this.image = element.image;
        this.productId = element.productId;
        this.details = element.details;
        this.brand = element.brand; 
      });
    });
  }

  categorySelected="";
  subcategorySelected="";
  filter(category){
    let url="http://localhost:10083/products/category/";
    
    if(category=="clothing"){
      this.categorySelected= category;
      url=url+category;
      this.ajaxCall(url);
    }
    if(category=="footware"){
      this.categorySelected=category;
      url=url+category;
      this.ajaxCall(url);
    }
    if(category=="accesories"){
      this.categorySelected=category;
      url=url+category;
      this.ajaxCall(url);
    }
    if(category=="bags"){
      this.categorySelected=category;
      url=url+category;
      this.ajaxCall(url);
    } 
  }

  filtersub(subcategory)
  {
    let subcatUrl = "http://localhost:10083/products/category/subcategory/"+subcategory;
    this.subcategorySelected=subcategory;
    this.ajaxCall(subcatUrl);
  }

  priceFunc(price1,price2){
    console.log(this.categorySelected);
    console.log(this.subcategorySelected);

    if(this.categorySelected){
    let priceurl="http://localhost:10083/products/category/"+this.categorySelected+"/";
    priceurl=priceurl+price1+"/"+price2;
    console.log(priceurl);
    this.ajaxCall(priceurl);
    }  
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

  checkLogin(){
    return this.service.checkLogin();
  }
  productName;
  productPrice;
  productCategory;
  productSubcategory;
  productDetails;
  productBrand;
  productImage;
  productUrl = "http://localhost:10083/products/addProducts";
  sendData()
  {
    console.log("hello");
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }    
      let json={
        name : this.productName,
        brand : this.productBrand,
        price : this.productPrice,
        details : this.productDetails,
        category : this.productCategory,
        subcategory : this.productSubcategory,
        image : this.productImage
      }

      this.httpClient.post(this.productUrl,json).subscribe(res=>
        {
            console.log(json);
        });
        alert('SUCCESS!! :-)\nProduct added succefully!');
  }  

  addUrl = "http://localhost:10083/cart/addItem/productId/";
  item=false;
  addItem(productId)
  {
      const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders({Authorization: 'Basic '+token});

      this.httpClient.get(this.addUrl+productId,{headers}).subscribe(res=>
      {
        this.item=true;
      },error=>
      {
        alert("Cant add to cart");
      });
  }

  search;
  
  searchOnClick()
  {
    let url = "http://localhost:10083/products/search/";
    if(this.search!=undefined && this.search!=""){
    this.httpClient.get(url+this.search).subscribe(res=>{
        this.array=res;
        this.categorySelected="";
    });
  }
  }

  direct(){
    this.router.navigate(['/home']);
   }
}
