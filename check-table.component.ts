import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-check-table',
  templateUrl: './check-table.component.html',
  styleUrls: ['./check-table.component.css']
})
export class CheckTableComponent implements OnInit{
  InforPerson: any = [
    { "id": 1, "Name": "Jayesh", "select": false, "age": 34 },
    { "id": 2, "Name": "Mukesh", "select": false, "age": 34 },
    { "id": 3, "Name": "raja", "select": false, "age": 34 },
    { "id": 4, "Name": "ashu", "select": false, "age": 34 },
    { "id": 5, "Name": "rakesh", "select": false, "age": 34 },
    { "id": 6, "Name": "Mayank", "select": false, "age": 34 },
    { "id": 7, "Name": "Jayesh", "select": false, "age": 34 },
    { "id": 8, "Name": "Mukesh", "select": false, "age": 34 },
    { "id": 9, "Name": "raja", "select": false, "age": 34 },
    { "id": 10, "Name": "ashu", "select": false, "age": 34 },
    { "id": 11, "Name": "rakesh", "select": false, "age": 34 },
    { "id": 12, "Name": "Mayank", "select": false, "age": 34 }
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataObs: Observable<any>;
  indeterminateIndication: boolean = false;
  checkSelect: any;
  checked: boolean = false;
  allcondition: any;
  checkindeterCheck: any;
  constructor(private _changeDetectorRef: ChangeDetectorRef) {
    console.log("first");
  }
  ngOnInit(): void {
    this.setPagination(this.InforPerson);
  }
  setPagination(InforPerson:any)
  {
    this.dataSource = new MatTableDataSource<any>(InforPerson);
    this._changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataObs = this.dataSource.connect();
  }
  
  Checkevent($event: any) {
    let id: any = $event.source.value;
    let ischeck = $event.source.checked;
    if (ischeck) {
      this.indeterminateIndication = false;
      this.checked = false;
      this.InforPerson.map((d: any) => {
        if (id == d.id) {
          d.select = ischeck;
        }
      });
      console.log(this.InforPerson);
      this.allcondition = this.InforPerson.every(this.tocheck);
      if (this.allcondition == true) {
        this.indeterminateIndication = false;
        this.checked = true;
      }
      else {
        this.indeterminateIndication = true;
      }
    }
    else {
      this.indeterminateIndication = false;
      this.InforPerson.map((obj: any) => {
        if (obj.id == id) {
          obj.select = ischeck;
        }
      })
      this.checkindeterCheck = this.InforPerson.every(this.checkInderter);
      if (this.checkindeterCheck) {
        this.checked = false;
        this.indeterminateIndication = false;
        console.log(this.checked);
      }
      else {
        this.checked = false;
        this.indeterminateIndication = true;
      }
    }
  }
  onheaderChange($event: any) {
    let ischeck = $event.source.checked;
    if (ischeck) {
      this.checked = true;
      this.InforPerson.map((obj: any) => {
        obj.select = ischeck;
      })
    }
    else {
      this.checked = false;
      this.InforPerson.map((obj: any) => {
        obj.select = ischeck;
      })
    }
  }
  tocheck(element: any) {
    return (element.select);
  }
  tocheckIndeterminate(element: any) {
    return ((element.select)!);
  }
  checkInderter(element: any) {
    return ((element.select == false));
  }
}
