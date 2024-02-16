import { Component, OnInit } from '@angular/core';
import { AppConfigService } from './app-config.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isAdmin = false;
  isAccessible = false;

  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  constructor(private appConfig: AppConfigService) {}

  ngOnInit(): void {
    this.isAdmin = this.appConfig.isAdminRole();
    this.isAccessible = this.appConfig.isAccessible();
  }
}
