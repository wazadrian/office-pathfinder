import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject<string>("");
  private messageForSearch = new BehaviorSubject<string>("");
  private messageSrc = new BehaviorSubject<boolean>(false);
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
  
  currentMessage = this.messageSource.asObservable();
  currentMessageForSearch = this.messageSource.asObservable();
  currentMsg = this.messageSrc.asObservable();
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

  changeDataForSearch(data : string) {
    this.messageForSearch.next(data)
  }

  changeMsgWater(wanted : boolean) {
    this.messageElevator.next(wanted)
  }

  changeMsgFire(wanted : boolean) {
    this.messageElevator.next(wanted)
  }

  changeMsgCoffee(wanted : boolean) {
    this.messageElevator.next(wanted)
  }

  changeMsgAid(wanted : boolean) {
    this.messageElevator.next(wanted)
  }

  changeMsgPrinter(wanted : boolean) {
    this.messageElevator.next(wanted)
  }

  changeMsgEat(wanted : boolean) {
    this.messageElevator.next(wanted)
  }

  changeMsgInfo(wanted : boolean) {
    this.messageElevator.next(wanted)
  }

  changeMsgBed(wanted : boolean) {
    this.messageElevator.next(wanted)
  }

  changeMsgActive(wanted : boolean) {
    this.messageElevator.next(wanted)
  }
  
  changeMsgHealth(wanted : boolean) {
    this.messageElevator.next(wanted)
  }

  changeMsgSearch(wanted : boolean) {
    this.messageSearch.next(wanted)
  }
}