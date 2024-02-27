import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor() {}

  public error(err: Error) {
    alert(err.message);
  }
}
