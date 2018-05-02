import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  roundnum(num, roundTo) {
    return Math.round(num / roundTo) * roundTo;
  }

  getRandom(startFrom, maxNum) {
    return Math.floor(Math.random() * maxNum) + startFrom;
  }
}
