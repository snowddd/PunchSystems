import { Component, OnInit } from '@angular/core';
import { FactoryService } from '../services/factory.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-memberprofile',
  templateUrl: './memberprofile.component.html',
  styleUrls: ['./memberprofile.component.css']
})
export class MemberprofileComponent implements OnInit {

  id:any;
  name:string;
  sex:string;
  personId:string;
  birthDate:string;
  phone:string;
  position:string;
  department:string;
  data;
  employee;

  constructor(private router: Router,private factory:FactoryService) { }

  ngOnInit() {
this.profile();
  }

  profile() {
    console.log(this.factory.id)
    this.data = {"id":this.factory.id}

    this.factory.sendRequest('profiLe',this.data).subscribe(
      (res) => {
      // console.log(res);
      if(res.returnCode === '0000'){
      this.employee = res.return[0];
      this.id = this.employee.id;
      this.name = this.employee.name;
      this.sex = this.employee.sex;
      this.personId = this.employee.personId;
      this.birthDate = this.employee.birthDate;
      this.phone = this.employee.phone;
      this.position = this.employee.position;
      this.department = this.employee.department;

      }else {
        alert('獲取用戶資訊失敗');
      }
      }, (err) => {
        console.log(err);
        alert('系統出現錯誤');
      });
  
  

  }

  goLeave(){
    this.router.navigateByUrl('leave');
  }
  goPunch(){
    this.router.navigateByUrl('punch');
  }

}
