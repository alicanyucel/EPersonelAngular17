import { Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core';
import { PersonelModel } from '../../models/personel.model';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { GridModule } from '@progress/kendo-angular-grid'
import { State } from '@progress/kendo-data-query';
import { DataGridComponent } from '../../common/data-grid/data-grid.component';
import { DataGridColumnComponent } from '../../common/data-grid-column/data-grid-column.component';
import { FlexiGridColumnComponent, FlexiGridComponent, FlexiGridService, StateModel } from 'flexi-grid';

@Component({
  selector: 'app-personels',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    GridModule, 
    DataGridComponent, 
    DataGridColumnComponent, 
    FlexiGridComponent, 
    FlexiGridColumnComponent],
  templateUrl: './personels.component.html',
  styleUrl: './personels.component.css'
})
export class PersonelsComponent implements OnInit {
  result = signal<{ data: PersonelModel[], total: number }>({ data: [], total: 0 });
  loading = signal<boolean>(false);
  state = signal<StateModel>(new StateModel());

  addModel = signal<PersonelModel>(new PersonelModel());

  @ViewChild("addModalCloseBtn") addModalCloseBtn : ElementRef<HTMLButtonElement> | undefined;

  constructor(
    private http: HttpService,
    private flexi: FlexiGridService
  ) { }

  ngOnInit(): void {
    this.getAllFlexiGridOData();
  }  

  create(form: NgForm){
    if(form.valid){
      this.http.post("personels/create", this.addModel(), ()=> {
        this.getAllFlexiGridOData();
        this.addModel.set(new PersonelModel());
        this.addModalCloseBtn!.nativeElement.click();
      })
    }
  }

  dataStateChange(event: StateModel){
    this.state.set(event);    
    this.getAllFlexiGridOData();
  }

  getAllFlexiGridOData(){
    this.loading.set(true);

    let endpoint = `Personels/GetAllOData?$count=true&`;

    endpoint += this.flexi.getODataEndpoint(this.state());

    this.http.get<any>(endpoint, (res) => {
      this.result.set(res);
      this.loading.set(false);
    });
  } 

}
