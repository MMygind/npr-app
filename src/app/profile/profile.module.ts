import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import {ProfilePage} from './profile.page';
import {ProfilePageRoutingModule} from './profile-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ProfilePage }]),
    ProfilePageRoutingModule,
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}