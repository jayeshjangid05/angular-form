import { Component,OnInit} from '@angular/core'
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  autcomplete:boolean=false;
  data:any= [
    {
      name: "Test 1",
      age: 13,
      average: 8.2,
      approved: true,
      description: "using 'Content here, content here' "
    },
    {
      name: 'Test 2',
      age: 11,
      average: 8.2,
      approved: true,
      description: "using 'Content here, content here' "
    },
    {
      name: 'Test 4',
      age: 10,
      average: 8.2,
      approved: true,
      description: "using 'Content here, content here' "
    },
  ];
  task:any=[
    {name: 'Primary', completed: false, color: 'primary'},
    {name: 'Accent', completed: false, color: 'accent'},
    {name: 'Warn', completed: false, color: 'warn'}
  ]
  options:any;
  constructor()
  {};
  ngOnInit(): void {
    
  }
  
  DownloadFile()
  {
    this.options= { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Your title',
      useBom: true,
      headers: ["First Name", "Last Name", "ID","approved","description"]
    };
    new ngxCsv(this.data, "filename", this.options)
  }
  someComplete():boolean
  {
    return this.task.filter(t => t.completed).length > 0 && !this.autcomplete; 
  }
  setAll(completed:boolean)
  {
       this.autcomplete=completed;
       this.task.map(t => (t.completed = completed));
  }
  updateAllComplete()
  {
    this.autcomplete =this.task.every(t => t.completed);
    console.log(this.task);
  }
}
