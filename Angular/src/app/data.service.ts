import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject<string>("");
  private messageSrc = new BehaviorSubject<boolean>(false);
  private messageElevator = new BehaviorSubject<boolean>(false);

  currentMessage = this.messageSource.asObservable();
  currentMsg = this.messageSrc.asObservable();
  currentMsgElevator = this.messageElevator.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeMsg(wanted : boolean) {
    this.messageSrc.next(wanted)
  }

  changeMsgElevator(wanted1 : boolean) {
    this.messageElevator.next(wanted1)
  }


}