import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject<string>("");
  private messageForSearch = new BehaviorSubject<string>("");
  private messageWC = new BehaviorSubject<boolean>(false);
  private messageElevator = new BehaviorSubject<boolean>(false);
  private messageWater = new BehaviorSubject<boolean>(false);
  private messageFire = new BehaviorSubject<boolean>(false);
  private messageCoffee = new BehaviorSubject<boolean>(false);
  private messageAid = new BehaviorSubject<boolean>(false);
  private messagePrinter = new BehaviorSubject<boolean>(false);
  private messageEat = new BehaviorSubject<boolean>(false);
  private messageInfo = new BehaviorSubject<boolean>(false);
  private messageBed = new BehaviorSubject<boolean>(false);
  private messageActive = new BehaviorSubject<boolean>(false);
  private messageHealth = new BehaviorSubject<boolean>(false);
  private messageSearch = new BehaviorSubject<boolean>(false);
  private messageClear = new BehaviorSubject<boolean>(false);
  
  currentMessage = this.messageSource.asObservable();
  currentMessageForSearch = this.messageForSearch.asObservable();
  currentMsgWC = this.messageWC.asObservable();
  currentMsgElevator = this.messageElevator.asObservable();
  currentMsgWater = this.messageElevator.asObservable();
  currentMsgFire = this.messageElevator.asObservable();
  currentMsgCoffee = this.messageElevator.asObservable();
  currentMsgAid = this.messageElevator.asObservable();
  currentMsgPrinter = this.messageElevator.asObservable();
  currentMsgEat = this.messageElevator.asObservable();
  currentMsgInfo = this.messageElevator.asObservable();
  currentMsgBed = this.messageElevator.asObservable();
  currentMsgActive = this.messageElevator.asObservable();
  currentMsgHealth = this.messageElevator.asObservable();
  currentMsgSearch= this.messageSearch.asObservable();
  currentMsgClear= this.messageClear.asObservable();

  constructor() { }

  changeMsgClear(message: boolean) {
    this.messageClear.next(message)
  }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeMsgWC(wanted : boolean) {
    this.messageWC.next(wanted)
  }

  changeMsgElevator(wanted : boolean) {
    this.messageElevator.next(wanted)
  }

  changeDataForSearch(data : string) {
    this.messageForSearch.next(data)
  }

  changeMsgWater(wanted : boolean) {
    this.messageWater.next(wanted)
  }

  changeMsgFire(wanted : boolean) {
    this.messageFire.next(wanted)
  }

  changeMsgCoffee(wanted : boolean) {
    this.messageCoffee.next(wanted)
  }

  changeMsgAid(wanted : boolean) {
    this.messageAid.next(wanted)
  }

  changeMsgPrinter(wanted : boolean) {
    this.messagePrinter.next(wanted)
  }

  changeMsgEat(wanted : boolean) {
    this.messageEat.next(wanted)
  }

  changeMsgInfo(wanted : boolean) {
    this.messageInfo.next(wanted)
  }

  changeMsgBed(wanted : boolean) {
    this.messageBed.next(wanted)
  }

  changeMsgActive(wanted : boolean) {
    this.messageActive.next(wanted)
  }
  
  changeMsgHealth(wanted : boolean) {
    this.messageHealth.next(wanted)
  }

  changeMsgSearch(wanted : boolean) {
    this.messageSearch.next(wanted)
  }
}