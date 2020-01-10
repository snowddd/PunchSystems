import { Component, OnInit } from '@angular/core';
import { FactoryService } from '../services/factory.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-punchin',
  templateUrl: './punchin.component.html',
  styleUrls: ['./punchin.component.css']
})
export class PunchinComponent implements OnInit {

  constructor(private router: Router, private factory: FactoryService) { }

  ngOnInit() {
    this.punchRecords();
  }

  punchjson;
  data;
  punchjsoncheck: boolean = true;

  punchType(punch) {
    if (punch == 1) {
      return 'PunchIn';
    } else if (punch == 2) {
      return 'PunchOut';
    }
  }

  punch() {
    this.data = { "id": localStorage.getItem('id') }
    this.factory.sendRequest('punch', this.data).subscribe(
      (res) => {
        if (res.returnCode === '0000') {
          // this.punchjson = res.return;
          this.punchRecords();
          alert('Punch success');
        }
        else if(res.returnCode === '0002'){
          alert('Check your this day Punch records');
        }else {
          alert('fail to Punch');
        }
      }, (err) => {
        console.log(err);
        alert('Systems error');
      });

  }


  punchRecords() {
    this.data = { "id": localStorage.getItem('id') }
    this.factory.sendRequest('punchRecords', this.data).subscribe(
      (res) => {
        if (res.returnCode === '0000') {
          this.punchjson = res.return;
        } else if (res.returnCode === '0001') {
          this.punchjsoncheck === false;
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
