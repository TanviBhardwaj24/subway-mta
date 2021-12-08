import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubwayService {
  private url = 'http://localhost:8080/api/trains/';
  constructor(private http: HttpClient) { }

  getTrains(): Observable<any>{
    console.log('in');
    return this.http.get<any>("http://localhost:8080/api/trains/");
  }

  // useResponse(): Observable<any> {
  //   const headers = { "x-api-key": 'hpATzat4xP9hqcoU36qW33JHMOEgPdTB4yOC1sKt' }
  //   this.http.get<any>("https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fall-alerts", { headers }).subscribe(data => {
  //    console.log('data is ', data );
  //   })
  // }


}


