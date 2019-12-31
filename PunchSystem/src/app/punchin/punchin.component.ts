import { Component, OnInit } from '@angular/core';
import { FactoryService } from '../services/factory.service';
@Component({
  selector: 'app-punchin',
  templateUrl: './punchin.component.html',
  styleUrls: ['./punchin.component.css']
})
export class PunchinComponent implements OnInit {

  constructor(private factory:FactoryService) { }

  ngOnInit() {
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
        // console.log(res);
        if(res.returnCode === '0000'){
        this.punchjson = res.return;
        alert('簽到、簽退成功');
        }else {
          alert('請確定當天是否已經簽退過');
        }
        }, (err) => {
          console.log(err);
          alert('系統出現錯誤');
        });

    }




}
