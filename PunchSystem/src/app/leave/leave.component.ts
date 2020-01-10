import { Component, OnInit } from '@angular/core';
import { FactoryService } from '../services/factory.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  min = new Date().getUTCFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
  max = (new Date().getUTCFullYear() + 1) + '-' + '12' + '-' + '31'
  leaveDate: string;
  leaveType;
  data;
  leavejson;
  leavejsoncheck: boolean = true;

  constructor(private router: Router, private factory: FactoryService) { }

  ngOnInit() {
    this.leaveRecords();
  }

  leave() {
    this.data = { "id": localStorage.getItem('id'), "Vacation": this.leaveType, "VacationDate": this.leaveDate }
    if (this.factory.checkDateMin(this.leaveDate)) {
      this.factory.sendRequest('leave', this.data).subscribe(
        (res) => {
          if (res.returnCode === '0000') {
            this.leaveRecords();
            alert('leave Success');
          } else {
            alert('leave fail , Check your date choose');
          }
        }, (err) => {
          console.log(err);
          alert('Systems error');
        });
    } else {
      alert('leave fail , Check your date choose');
    }


  }

  leaveRecords() {
    this.data = { "id": localStorage.getItem('id') }
    this.factory.sendRequest('leaveRecords', this.data).subscribe(
      (res) => {
        if (res.returnCode === '0000') {
          this.leavejson = res.return;
        }
        else if (res.returnCode === '0001') {
          this.leavejsoncheck === false;
        }
        else {
          alert('Systems error');
        }
      }, (err) => {
        console.log(err);
        alert('Systems error');
      });

  }

  goProfile() {
    this.router.navigateByUrl('member');

  }


}
