import { Component, OnInit ,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FactoryService } from '../services/factory.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data:any ;
  account:string;
  password:string;
  id:string;

  constructor(private router: Router,private factory:FactoryService) { }

  ngOnInit() {
  }

  login() {
    this.data = {"account":this.account,"password":this.password}
    this.factory.sendRequest('login',this.data).subscribe(
      (res) => {
      // console.log(res);
      if(res.returnCode === '0000'){
        this.factory.id = res.id;
        this.router.navigateByUrl('member');

      }else {
        alert('登入失敗');
      }
      }, (err) => {
        console.log(err);
        alert('系統出現錯誤');
      });
  
  

  }


}
