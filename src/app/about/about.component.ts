import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../app-config.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  isAdmin = false;

  constructor(private appConfig: AppConfigService) {}

  ngOnInit(): void {
    this.isAdmin = this.appConfig.validateUser();
  }
}
