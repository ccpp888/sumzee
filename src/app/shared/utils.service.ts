import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  roundnum(num, roundTo) {
    return Math.round(num / roundTo) * roundTo;
  }

  getRandom(startFrom, maxNum) {
    return Math.floor(Math.random() * maxNum) + startFrom;
  }
  
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  shuffleInPlace<T>(array: T[]): T[] {
    console.log('array In (pre shuffle)=%s',array.toString());
    if (array.length <= 1) return array; 

    for (let i = 0; i < array.length; i++) {  
      //set a random index value (min,max)
      const randomChoiceIndex = this.getRandomInt(i, array.length - 1);  
      // use array destructuring to swap
      [array[i], array[randomChoiceIndex]] = [array[randomChoiceIndex], array[i]];
    }
    console.log('array Out (post shuffle)=%s',array.toString());  
    return array;
  }
}
