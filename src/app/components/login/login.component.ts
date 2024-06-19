import { Component, ElementRef, Signal, ViewChild, signal } from '@angular/core';
import { LoginModel } from '../../models/login.model';
import { FormsModule, NgForm } from '@angular/forms';
import { ValidateDirective } from '../../directives/validate.directive';
import { Router, RouterLink } from '@angular/router';
import { SwalService } from '../../services/swal.service';
import { HttpService } from '../../services/http.service';
import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ValidateDirective, RouterLink, GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',  
})
export class LoginComponent {
  @ViewChild("password") passwordEl: ElementRef<HTMLInputElement> | undefined 

  data=signal<LoginModel>(new LoginModel());
  isShowPassword: boolean = false; 

  constructor(
    public http: HttpService, 
    private router: Router,
    private swal: SwalService,
    private authService: SocialAuthService
  ){
    this.authService.authState.subscribe((res)=> {
      console.log(res);      
    })
  }

  signIn(form: NgForm){
    if(form.valid){
      this.http.post("Auth/Login", this.data,(res)=> {
        localStorage.setItem("response", JSON.stringify(res))
        this.router.navigateByUrl("/");
        this.swal.callToast("Login is successful");
      });    
    }
  }

  changeShowPassword(){
    this.isShowPassword = !this.isShowPassword;

    if(this.isShowPassword){
      this.passwordEl!.nativeElement.type = "text";
    }else{
      this.passwordEl!.nativeElement.type = "password";
    }
  }
}
