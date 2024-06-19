import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwalService } from './swal.service';
import { LoginResponseModel } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private swal: SwalService
  ) {}

  getSecretKey(){
    if(localStorage.getItem("response")){
      const responseString = localStorage.getItem("response");
      const responseJson: LoginResponseModel = JSON.parse(responseString!);
      return responseJson.secretKey;      
    }
    return "";
  }

  get<T>(api: string, callBack: (res:T) => void) {
    this.isLoading = true;
    const secretKey = this.getSecretKey();

    this.http.get<T>(`https://localhost:7052/api/${api}`,{
      headers: {
        "SecretKey": secretKey
      }
    }).subscribe({
      next: (res) => {
        callBack(res);
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err);
        if (err.status === 400) {
          this.swal.callToast(err.error.message, "error");
        }
        else if (err.status === 401) {
          this.swal.callToast("You are not authorized!", "error");
        }
        else {
          this.swal.callToast("Someting went wrong!", "error");
        }
      }
    })
  }

  post<T>(api: string, body: any, callBack: (res:T) => void) {
    this.isLoading = true;
    this.http.post<T>(`https://localhost:7052/api/${api}`, body).subscribe({
      next: (res) => {
        callBack(res);
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err);
        if (err.status === 400) {
          this.swal.callToast(err.error.message, "error");
        }
        else if (err.status === 401) {
          this.swal.callToast("You are not authorized!", "error");
        }
        else {
          this.swal.callToast("Someting went wrong!", "error");
        }
      }
    })
  }
}
