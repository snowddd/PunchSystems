import { Component, OnInit } from '@angular/core';
import { FactoryService } from '../services/factory.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-memberprofile',
  templateUrl: './memberprofile.component.html',
  styleUrls: ['./memberprofile.component.css']
})
export class MemberprofileComponent implements OnInit {

  id: any;
  name: string;
  sex: string;
  personId: string;
  birthDate: string;
  phone: string;
  position: string;
  department: string;
  data;
  employee;

  constructor(private router: Router, private factory: FactoryService) { }

  ngOnInit() {
    this.profile();
  }

  profile() {
    this.data = { "id": localStorage.getItem('id') }

    this.factory.sendRequest('profiLe', this.data).subscribe(
      (res) => {
        if (res.returnCode === '0000') {
          this.employee = res.return[0];
          this.id = this.employee.id;
          this.name = this.employee.name;
          this.sex = this.employee.sex;
          this.personId = this.employee.personId;
          this.birthDate = this.employee.birthDate;
          this.phone = this.employee.phone;
          this.position = this.employee.position;
          this.department = this.employee.department;

        } else {
          alert('Get user profile fail');
        }
      }, (err) => {
        console.log(err);
        alert('Systems error');
      });



  }

  goLeave() {
    this.router.navigateByUrl('leave');
  }
  goPunch() {
    this.router.navigateByUrl('punch');
  }

  logout() {

    localStorage.removeItem('id');
    this.router.navigateByUrl('login');
  }
}
