import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  apiConfig = {
    host: 'http://localhost:5001', // 後端Host地址
};
}
