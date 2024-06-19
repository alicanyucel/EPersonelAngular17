import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { LoginResponseModel } from '../models/login-response.model';
import { SwalService } from '../services/swal.service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const swal = inject(SwalService);

  if(localStorage.getItem("response")){
    const responseString = localStorage.getItem("response");
    const responseJson: LoginResponseModel = JSON.parse(responseString!);

    const expires = new Date(responseJson.expires);
    const now = new Date();
    if(now > expires){      
      swal.callToast("The token has expired. You need to log in again","warning")
      router.navigateByUrl("/login");
      return false;
    }

    return true;
  }

  swal.callToast("You must log in if you want to continue!");
  router.navigateByUrl("/login");
  return false;
  
};
