import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router, RouterLink } from '@angular/router';
import { SwalService } from '../../services/swal.service';
import { RegisterModel } from '../../models/register.model';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild("password") passwordEl: ElementRef<HTMLInputElement> | undefined 

  data: RegisterModel = new RegisterModel();
  isShowPassword: boolean = false; 

  constructor(
    public http: HttpService, 
    private router: Router,
    private swal: SwalService
  ){}

  signUp(form: NgForm){
    if(form.valid){
      const formData = new FormData();
      formData.append("firstName", this.data.firstName);
      formData.append("lastName", this.data.lastName);
      formData.append("userName", this.data.userName);
      formData.append("password", this.data.password);
      if(this.data.file){
        formData.append("file", this.data.file,this.data.file.name);
      }

      this.http.post("Auth/Register", formData,()=> {        
        this.router.navigateByUrl("/login");
        this.swal.callToast("Register is successful. You can log in.");
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

  setFile(event:any){
    this.data.file = event.target.files[0];
  }
}
