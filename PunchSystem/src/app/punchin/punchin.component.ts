import { Component, OnInit } from '@angular/core';
import { FactoryService } from '../services/factory.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-punchin',
  templateUrl: './punchin.component.html',
  styleUrls: ['./punchin.component.css']
})
export class PunchinComponent implements OnInit {

  constructor(private router: Router,private factory:FactoryService) { }

  ngOnInit() {
    this.punchRecords();
  }

punchjson ;
    data;

    punchType(punch){
    if(punch==1){
     return 'PunchIn'; 
    }else if (punch ==2){
     return 'PunchOut'; 
    }
    }

    punch(){
      this.data = {"id":this.factory.id}
      this.factory.sendRequest('punch',this.data).subscribe(
        (res) => {
        console.log(res);
        if(res.returnCode === '0000'){
        // this.punchjson = res.return;
        this.punchRecords();
        alert('Punch success');
        }else {
          alert('Check your this day Punch records');
        }
        }, (err) => {
          console.log(err);
          alert('Systems error');
        });

    }

    
    punchRecords(){
      this.data = {"id":this.factory.id}
      this.factory.sendRequest('punchRecords',this.data).subscribe(
        (res) => {
        console.log(res);
        if(res.returnCode === '0000'){
        this.punchjson = res.return;
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
