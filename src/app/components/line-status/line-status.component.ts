import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatFormField} from "@angular/material/form-field";

@Component({
  selector: 'app-line-status',
  templateUrl: './line-status.component.html',
  styleUrls: ['./line-status.component.css']
})
export class LineStatusComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  id = "";
  status = "";
  lines_status:string[] = []

  ngOnInit(): void {
    this.checkStatus(this.id);
  }

  checkStatus(id: string) {
    const headers = {"x-api-key": 'hpATzat4xP9hqcoU36qW33JHMOEgPdTB4yOC1sKt'};

    this.http.get("https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts.json", {headers}).subscribe((response) => {
      for (const [k, v] of Object.entries(response)) {
        if (k === "entity") {
          for (var entity of v) {
            for (var elem in entity) {
              if (elem === "alert") {
                for (var value in entity[elem]) {
                  if (value === "informed_entity") {
                    // console.log("alert types ",entity[elem][value] );
                    if (id === entity[elem][value][0]["route_id"]) {
                      console.log("in here ");
                      this.lines_status.push(entity[elem]["transit_realtime.mercury_alert"]["alert_type"])
                    }
                  }
                }
              }else if (elem === "id") {
                if (id == entity[elem]) {
                  this.status = entity["alert"]["transit_realtime.mercury_alert"]["alert_type"];
                }
              }
            }
          }
        }
      }
    });
  }

  onSubmit(data: { lineid: string; }) {
    this.checkStatus(data.lineid);
    // alert("id is  : " + data.lineid + "and status is "+ this.status);
    return this.status;
  }
}
