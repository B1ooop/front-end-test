import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }
  //any means first name/second name/middle name
  anyNameValidator() {
    const pattern: RegExp = /^[А-Я]{1}[а-яё]{1,23}$/;
    return pattern;
  }

  dateValidator() {
    const pattern: RegExp = /^([1-9]|[12][0-9]|3[01])[- -.]([1-9]|1[012])[- -.](1|2)\d{3}$/;
    return pattern;
  }
}
