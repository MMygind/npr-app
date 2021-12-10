import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WashPage } from './wash.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { WashRoutingModule } from './wash-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    WashRoutingModule
  ],
  declarations: [WashPage]
})
export class WashModule {}