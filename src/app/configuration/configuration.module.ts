import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration.component';
import { RouterModule, Routes } from '@angular/router';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent,
  },
];

@NgModule({
  declarations: [ConfigurationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSlideToggleModule,
    MatExpansionModule,
    MatGridListModule,
    MatSnackBarModule,
  ],
})
export class ConfigurationModule {}
