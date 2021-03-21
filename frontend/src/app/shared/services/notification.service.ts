import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private notifierService: NotifierService
  ) { }

  public backEndError(message: string): void {
    this.notifierService.notify('error', message);
  }

  public success(message: string): void {
    this.notifierService.notify('success', message);
  }
}
