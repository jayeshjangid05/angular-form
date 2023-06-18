import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  shouldRun:boolean=true;
  showIcontex=true;
  toggle()
  {
    this.showIcontex=!this.showIcontex;
  }
}
