import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  fullName: string = "";
  avatarUrl: string = "";

  constructor(private router: Router){
    if(localStorage.getItem("response")){
      const response = JSON.parse(localStorage.getItem("response")!);
      this.fullName = response.fullName;
      this.avatarUrl = response.avatarUrl;
    }
  }

  logout(){
    localStorage.removeItem("response");
    this.router.navigateByUrl("/login");
  }
}
