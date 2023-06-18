import { Component,AfterViewInit,ViewChild} from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';

import { SelectionModel } from '@angular/cdk/collections';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const arr: any = [
  [
    [{
      position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', age: [
        [{ x: 23 }],
        [{ x: 222 }],
      ]
    }],
    [{
      position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', age: [
        [{ x: 23 }],
        [{ x: 222 }],
      ]
    }],
    [{
      position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', age: [
        [{ x: 23 }],
        [{ x: 222 }],
      ]
    }],
    [{
      position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', age: [
        [{ x: 23 }],
        [{ x: 222 }],
      ]
    }],
    [{
      position: 5, name: 'Boron', weight: 10.811, symbol: 'B', age: [
        [{ x: 23 }],
        [{ x: 222 }],
      ]
    }],
    [{
      position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', age: [
        [{ x: 23 }],
        [{ x: 222 }],
      ]
    }],
  ],
];
@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent {
  public dataSource = new MatTableDataSource<PeriodicElement>;
  displayedColumns: string[] = ['checkbox', 'position', 'name', 'weight', 'symbol', 'age'];
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  g:any;
  temp:any;
  jtemp:any;
  t:any;
  j:any;
  filtervalue:any;

  x: any;
  ngOnit() {
  }
  constructor() {
    this.tableData();
  }
  tableData() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(arr[0].map((a: any) => {
      return a[0];
    }));
    console.log(this.dataSource);
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /*Delete element from selection of matcheckbox*/
  RemoveSelected() {
    let row = this.selection.selected;
    row.forEach(element => {
      arr[0].map((item: any, i = 0) => {
        if (item[0].position == element.position) {
          arr[0].splice(i, 1);
        };
      })
    })

  }
  /*Move upward side*/
  Moveup() {
    let element = this.selection.selected;
    element.forEach(selectElement => {
      console.log("element is", element);
      let pos = element[0].position;
      arr[0].map((item: any, i = 0) => {
        if (item[0].position == selectElement.position && selectElement.position > 1 && i>0) {
             let temp=arr[0][i];
             let j = arr[0][i - 1];
             arr[0][i - 1] = temp;
             arr[0][i] = j;
             this.dataSource = new MatTableDataSource<PeriodicElement>(arr[0].map((a: any) => {
              return a[0];
            }));
        }
      });
    });
  }

  Downup()
  {
    let elements= this.selection.selected;
    for(let i =0 ;i < elements.length;i++)
    {
      for(let j=0 ; j < arr[0].length;j++)
      {
        if(arr[0][j][0].position==elements[i].position)
        {
          if(i+j+1<arr[0].length)
          {
            let temp  =  arr[0][j];
            let stemp =  arr[0][j+i+1];
            arr[0][j+i+1]=temp;
            arr[0][j]=stemp;
            break;
          }

        }
      }
    }
    this.dataSource = new MatTableDataSource<PeriodicElement>(arr[0].map((a: any) => {
      return a[0];
    }));
  }
  applyFilter(event: Event)
  {
    this.filtervalue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=this.filtervalue;
  }
}
