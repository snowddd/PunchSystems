import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FactoryService } from '../services/factory.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data: any;
  account: string;
  password: string;
  id: string;


  constructor(private router: Router, private factory: FactoryService,private md5: Md5) { 
  }

  ngOnInit() {

    if (localStorage.getItem('id')) {
      this.router.navigateByUrl('member');
    }
  }

  login() {
    this.data = { "account": this.account, "password": this.hash(this.password) }
    this.factory.sendRequest('login', this.data).subscribe(
      
      (res) => {
        if (res.returnCode === '0000') {
          localStorage.setItem('id', `${res.id}`);
          this.router.navigateByUrl('member');

        } else {
          alert('Login fail');
        }
      }, (err) => {
        console.log(err);
        alert('Systems error');
      });



  }

  //md5 hash
  hash(hashString:string){
    return (<string>Md5.hashStr(hashString)).toLowerCase();
  }


}
