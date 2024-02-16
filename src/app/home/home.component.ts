import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../app-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isAdmin = false;

  constructor(private appConfig: AppConfigService) {}

  ngOnInit(): void {
    this.isAdmin = this.appConfig.validateUser();
  }
}
