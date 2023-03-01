import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Party } from './interface/party';

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DynamicServiceAngular';
  public getJsonValue: any;
  public postJsonValue: any;
  public screenResult: any;
  public remarks: any;
  formModal: any;

  reference = '';
  tppe = '';
  request = '';

  public sum: any;

   body = {
    reference : '2622023#1',
    type : 'CORE',
    request : {
      name : 'Mohamed Ibrahim',
      country: 'Iran',
      identity: '16855038'
    }
  }

  counter = 0;

   header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept' : 'application/json',
  })

  constructor(private http: HttpClient){
    // this.getParties();
  }

  ngOnInit(): void{
 
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("remarksModal")
    );
  }

  // public getMethod(){

  //   this.http.post('http://localhost:91/testRestAPI/partyExtraction', this.body, {headers: this.header}).subscribe((data) => {
  //     console.log(data);
  //     this.getJsonValue = data;
      
  //   }
  //   );
  // }

  public getMethod(){

    this.http.post('http://localhost:8080/partyExtraction', this.body, {headers: this.header}).subscribe((data) => {
      console.log(data);
      this.getJsonValue = data;
      
    }
    );
  }

  public getSum(){
    this.http.get('http://localhost:91/testRestAPI/summation?num1=4&num2=5').subscribe((data) => {
      this.sum = data;
    });
  }

  public getParties(): Observable<Party>{

    return this.http.get<Party>('http://localhost:91/testRestAPI_war/parties');
  }


  public increament(){
    this.counter += 1;
  }

  openModal(remarks: string){
    this.remarks = remarks;
    this.formModal.show();
  }

  doSomething(){
    this.formModal.hide();
  }
}

