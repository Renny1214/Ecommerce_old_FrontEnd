import { Component, OnInit, IterableDiffers } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppService } from "../app.service";
import { AuthenticationService } from "../authentication.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  productId;
  url = "http://localhost:10083/products/id/";
  name;
  array;
  price;
  category;
  subcategory;
  image;
  brand;
  details;
  detailsarr = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private service: AppService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}
  registerForm: FormGroup;
  submitted = false;
  ngOnInit() {
    this.getUserInfo();
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get("id");
      this.productId = id;
      this.url = this.url + this.productId;
    });
    this.httpClient.get(this.url).subscribe(res => {
      this.array = res;
      console.log(this.array);
      this.productId = this.array.productId;
      this.brand = this.array.brand;
      this.category = this.array.category;
      this.subcategory = this.array.subcategory;
      this.image = this.array.image;
      this.price = this.array.price;
      this.details = this.array.details;
      this.name = this.array.name;
      this.detailsarr = this.details.split("\n");
      this.detailsarr.shift();
    });

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      image: ['', Validators.required],
      details: ['', Validators.required],  
  });
  }

  get f() { return this.registerForm.controls; }

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
item = false;
  addUrl = "http://localhost:10083/cart/addItem/productId/";
  addItem(productId)
  {
      const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders({Authorization: 'Basic '+token});

      this.httpClient.get(this.addUrl+productId,{headers}).subscribe(res=>
      {
        this.item = true;
      });
  }
 

  editData()
  {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }   
      const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders({Authorization: 'Basic '+token});

      let editUrl = "http://localhost:10083/products/editItem";
      let json={
        productId : this.productId,
        name : this.name,
        brand : this.brand,
        price : this.price,
        details : this.details,
        category : this.category,
        subcategory : this.subcategory,
        image : this.image
      }

      this.httpClient.post(editUrl,json,{headers}).subscribe(res=>
        {
          console.log(json);
        });   
        alert('SUCCESS!! :-)\nProduct updated succefully!');  
  }

 
  deleteProduct()
  {
    const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders({Authorization: 'Basic '+token});
      let  deleteUrl = "http://localhost:10083/products/deleteProduct";
      let json={
        productId : this.productId,
        name : this.name,
        brand : this.brand,
        price : this.price,
        details : this.details,
        category : this.category,
        subcategory : this.subcategory,
        image : this.image
      }
      this.httpClient.post(deleteUrl,json,{headers}).subscribe(res=>
        {
           alert("item deleted");
           this.router.navigate(["/products"]);
        });     
    }

    redirect()
    {
      this.router.navigate(["/cart"]);
    }
}