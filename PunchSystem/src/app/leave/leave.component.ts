import { Component, OnInit } from '@angular/core';
import { FactoryService } from '../services/factory.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  min = new Date().getUTCFullYear()+'-'+(new Date().getMonth()+1)+'-'+ new Date().getDate()
  max = (new Date().getUTCFullYear()+1)+'-'+'12'+'-'+'31'
  leaveDate:string;
  leaveType;
  data;
  leavejson;

  constructor(private router: Router,private factory:FactoryService) { }

  ngOnInit() {
    this.leaveRecords();
  }

  leave(){
    this.data = {"id":this.factory.id,"Vacation":this.leaveType,"VacationDate":this.leaveDate}

    this.factory.sendRequest('leave',this.data).subscribe(
      (res) => {
      // console.log(res);
      if(res.returnCode === '0000'){
        this.leaveRecords();
        alert('leave Success');

      }else {
        alert('leave fail , Check your date choose');
      }
      }, (err) => {
        console.log(err);
        alert('Systems error');
      });
  
  }

  leaveRecords(){
    this.data = {"id":this.factory.id}
    this.factory.sendRequest('leaveRecords',this.data).subscribe(
      (res) => {
      console.log(res);
      if(res.returnCode === '0000'){
      this.leavejson = res.return;
      }else {
        alert('Systems error');
      }
      }, (err) => {
        console.log(err);
        alert('Systems error');
      });

  }

  goProfile(){
    this.router.navigateByUrl('member');

  }


}
