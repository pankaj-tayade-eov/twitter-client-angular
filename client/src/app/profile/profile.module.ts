import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { TweetListComponent } from './tweet-list/tweet-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProfileComponent
  ],
  providers: [
    SharedModule
  ],
  declarations: [ProfileComponent, TweetListComponent]
})
export class ProfileModule { }
