import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-patient-grid',
  templateUrl: './patient-grid.component.html',
  styleUrls: ['./patient-grid.component.css']
})
export class PatientGridComponent implements OnInit {

  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];

  temp = [];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  reserv = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 1000; i++) {
      this.rows.push({ name: 'Austin' + i, gender: 'Female', company: 'Burger king' });
    }
    this.reserv = this.rows;
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    if (val !== '') {
      this.rows = this.reserv;
      const temp = this.rows.filter(function (d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        // Whenever the filter changes, always go back to the first page
      });
      this.rows = temp;
      this.table.offset = 0;
    } else {
      this.rows = this.reserv;
      this.table.offset = 0;
    }
    // filter our data



  }

}
