import { Component, OnInit } from '@angular/core';
import { PersonelModel } from '../../models/personel.model';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-personels',
  standalone: true,
  imports: [],
  templateUrl: './personels.component.html',
  styleUrl: './personels.component.css'
})
export class PersonelsComponent implements OnInit {
  personels: PersonelModel[] = [];

  constructor(
    private http: HttpService
  ){}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.http.get("Personels/GetAll", (res:any)=> this.personels = res.data);
  }
}
