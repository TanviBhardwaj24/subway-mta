import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-uptime',
  templateUrl: './uptime.component.html',
  styleUrls: ['./uptime.component.css']
})
export class UptimeComponent implements OnInit {
  uptime = "";
  status = "";
  message = "";
  total = 0;
  constructor( private http: HttpClient) { }

  find_total(total: number) {
    this.total = total;
  }

  calculate_uptime(id: string) {
    const headers = { "x-api-key": 'hpATzat4xP9hqcoU36qW33JHMOEgPdTB4yOC1sKt' };

    this.http.get("https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts.json", {headers}).subscribe((response) => {
      for (const[k, v] of Object.entries(response)){
        console.log(" k is ", k);
        console.log("v is ", v);
        if (k === "entity") {
          for (var entity of v) {
            for (var elem in entity) {
              if (elem === "id") {
                if (id === entity[elem]) {
                  if(entity["alert"]["transit_realtime.mercury_alert"]["alert_type"] != "Delays"){
                    let total = 0;
                    (entity["alert"]["active_period"]).map((val: any) => {
                      let start = val["start"];
                      let end = val["end"];
                      total += (end-start);
                      console.log('total now is ', total);
                    })
                    this.find_total(total);
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  onSubmit(data: { lineid: string; }) {
    console.log("data is ", data);
    this.calculate_uptime(data.lineid);
  }

  ngOnInit(): void {
  }

}
