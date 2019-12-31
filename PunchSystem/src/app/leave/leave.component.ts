import { Component, OnInit } from '@angular/core';
import { FactoryService } from '../services/factory.service';
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

  constructor(private factory:FactoryService) { }

  ngOnInit() {
  }

  leave(){
    this.data = {"id":this.factory.id,"Vacation":this.leaveType,"VacationDate":this.leaveDate}

    this.factory.sendRequest('leave',this.data).subscribe(
      (res) => {
      // console.log(res);
      if(res.returnCode === '0000'){
      alert('請假成功');

      }else {
        alert('請假失敗 請確認當天是否已經請假');
      }
      }, (err) => {
        console.log(err);
        alert('系統出現錯誤');
      });
  
  }
}
