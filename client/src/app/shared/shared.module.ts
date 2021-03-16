import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtPipe } from './pipes/at.pipe';
import { ErrorsComponent } from './errors/errors.component';
import { TwitterService } from '../shared/services/twitter/twitter.service';
import { NotificationService } from '../shared/services/notification/notification.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ErrorsComponent,
    AtPipe
  ],
  declarations: [
    AtPipe,
    ErrorsComponent
  ],
  providers: [
    TwitterService,
    NotificationService
  ],
})
export class SharedModule { }
