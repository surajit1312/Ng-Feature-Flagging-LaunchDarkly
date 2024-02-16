import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecretComponent } from './secret.component';
import { RouterModule, Routes } from '@angular/router';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';

const routes: Routes = [
  {
    path: '',
    component: SecretComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSlideToggleModule,
    MatExpansionModule,
    MatGridListModule,
  ],
})
export class SecretModule {}
