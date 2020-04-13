import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  apiConfig = {
    host: 'https://punchsystem-272703.appspot.com', // 後端Host地址
};
}

