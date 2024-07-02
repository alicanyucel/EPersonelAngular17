import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  fullName = signal("");
  avatarUrl = signal("");

  constructor(private router: Router){
    if(localStorage.getItem("response")){
      const response = JSON.parse(localStorage.getItem("response")!);
      this.fullName.set(response.fullName);
      this.avatarUrl.set(response.avatarUrl);
    }
  }

  logout(){
    localStorage.removeItem("response");
    this.router.navigateByUrl("/login");
  }
}
