import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { DataGridColumnComponent } from '../data-grid-column/data-grid-column.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'data-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.css'
})
export class DataGridComponent {
@Input() value: {data: any[], total: number} = {data: [], total: 0};
pageNumbers = [1,2,3,4,5,6,7,8,9,10];
state: {
  pageSize: number,
  skip: number,
  pageNumber: number
} = {
  pageSize: 10,
  skip: 0,
  pageNumber: 1
};
@Output() dataStateChange = new EventEmitter<any>();


@ContentChildren(DataGridColumnComponent) columns: QueryList<DataGridColumnComponent> | undefined;

  ngAfterContentInit() {
    console.log(this.columns);
  }


  changePage(pageNumber: number){
    this.state.pageNumber = pageNumber;
    this.state.skip = (pageNumber - 1) * this.state.pageSize;
    this.dataStateChange.emit(this.state);
  }
}
