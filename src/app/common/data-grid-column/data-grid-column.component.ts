import { Component, Input } from '@angular/core';

@Component({
  selector: 'grid-column',
  standalone: true,
  imports: [],
  template: '',
  styleUrl: './data-grid-column.component.css'
})
export class DataGridColumnComponent {
  @Input() field: string = '';
  @Input() title: string = '';
}
