import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  //reset form validators when routing to another :id 
  resetFormSubject: Subject<boolean> = new Subject<boolean>();
  resetChildForm() { this.resetFormSubject.next(true) }
  getResetFormSubject() { return this.resetFormSubject.asObservable() }


  //any means first name/second name/middle name
  anyNameValidator() {
    const pattern: RegExp = /^[А-Я]{1}[а-яё]{1,23}$/;
    return pattern;
  }




}
