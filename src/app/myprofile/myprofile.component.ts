import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppService } from "../app.service";
import { AuthenticationService } from "../authentication.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: "app-myprofile",
  templateUrl: "./myprofile.component.html",
  styleUrls: ["./myprofile.component.css"]
})

export class MyprofileComponent implements OnInit{

  name ;
  email ;
  phone ;
  password ;
  address ;
  is_seller : Boolean;
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

 
  error = false;
  
  url = "http://localhost:10083/logout/userInfo/";
  ngOnInit() {
    if(!this.service.checkLogin())
    {
      this.router.navigate(["/home"]);
    }
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
 
  getUserInfo()
  {
    let email = sessionStorage.getItem("email");
    let temp = email.split("@");
    console.log(temp[0]);
    console.log(temp[1]);
    let emailName = temp[0];
    let emailId = temp[1].split(".")[0];
    let domain = temp[1].split(".")[1];
    let url1 = this.url+ emailName + "/" + emailId +"/"+domain;
    
    this.httpClient
      .get(url1)
      .subscribe((res : any)=>
        {
          this.name = res.name;
          this.email = res.email;
          this.address = res.address;
          this.phone =res.phone;
          this.password = res.password;
         this.is_seller=res.seller;
        });
  }

 
  url1 = "http://localhost:10083/logout/logout";
  logout() {
    if (this.service.checkLogin()) {
      this.authService.logoutService();
      this.httpClient.get(this.url1).subscribe(res => {
        alert("Logout successful");
      });
      this.router.navigate(["/products"]);
    }
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
  goToHistory()
  {
    this.router.navigate(["/history"]);
  }

  oldpassword;
  newpassword;
  confirmpassword;
  changeBoolean=false;

  changePassword()
  {
    if(this.oldpassword==undefined || this.newpassword==undefined || this.confirmpassword==undefined)
    {
      alert("fields are left empty");
    }
    else if(this.password==this.oldpassword)
    {
      if(this.newpassword==this.confirmpassword)
      {
        this.password = this.newpassword;
        this.changeBoolean=true;
        alert("Password changes successfully");
      }
      else
      {
        alert("Confirm password does not match");
      }
    }
    else{
      alert("your current password is incorrect");
    }

  }


validate=false;
  editUser()
  {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({Authorization: 'Basic '+token});

    let editUrl = "http://localhost:10083/api/editUser";
    let json={
      name : this.name,
      phone : this.phone,
      address : this.address,
      password :  this.password,
      email : this.email,
      seller : this.is_seller
    }

    this.httpClient.post(editUrl,json,{headers}).subscribe(res=>
      {
        console.log(json);
      });   

      this.validate = true;
  
      if(this.changeBoolean==true)
      {
        this.logout();
        this.router.navigate(["/products"]);
      }
  }


  deactivate = false;
  deactivateUser()
{
  const token = sessionStorage.getItem('token');
  const headers = new HttpHeaders({Authorization: 'Basic '+token});

  let editUrl = "http://localhost:10083/api/deactivateUser";
  let json={
    name : this.name,
    phone : this.phone,
    address : this.address,
    password :  this.password,
    email : this.email,
    seller : this.is_seller
  }

  this.httpClient.post(editUrl,json,{headers}).subscribe(res=>
    {
      console.log(json);
    });   
   this.deactivate = true;
    this.changeBoolean=true;
      if(this.deactivate)
      {
        this.logout();
        this.router.navigate(["/products"]);
      }
}

}
