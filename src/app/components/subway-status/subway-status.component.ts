import {Component, OnInit} from '@angular/core';
import {SubwayService} from "../../services/subway.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {zip} from "rxjs";

@Component({
  selector: 'app-subway-status',
  templateUrl: './subway-status.component.html',
  styleUrls: ['./subway-status.component.css']
})
export class SubwayStatusComponent implements OnInit {
  delayed_lines: string[] = [];
  routes: string[] = [];
  linesDict = new Map<string, string>();

  constructor(private http: HttpClient, private subwayService: SubwayService) {
  }

  not_delayed: string[] = [];
  on_time: string[] = [];

  linesDelay() {
    const headers = new HttpHeaders().set("x-api-key", 'hpATzat4xP9hqcoU36qW33JHMOEgPdTB4yOC1sKt')

    this.http.get("https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts.json", {headers}).subscribe((response) => {
      console.log(typeof response);
      console.log("res ", response);
      for (const [k, v] of Object.entries(response)) {
        console.log("k is ", k);
        console.log("v is ", v);
        let count = 0;
        if (k === "entity") {
          for (var entity of v) {
            for (var elem in entity) {
              // console.log("elem is ", elem);
              if (elem === "alert") {
                for (var value in entity[elem]) {
                  if (value === "transit_realtime.mercury_alert") {
                    // console.log("alert types ",entity[elem][value] );
                    for (var alert_type in entity[elem][value]) {
                      if (alert_type === "alert_type" && entity[elem][value][alert_type] === "Delays") {
                        this.delayed_lines.push(entity["id"]);
                      } else if (alert_type === "alert_type" && entity[elem][value][alert_type] != "Delays") {
                        this.on_time.push(entity["alert"]["informed_entity"][0]["route_id"]);
                      }
                    }
                  }
                }
              }
            }
            if (entity["alert"]["transit_realtime.mercury_alert"]["alert_type"] === "Delays") {
              this.routes.push(entity["alert"]["informed_entity"][0]["route_id"]);
            }
            for (const line of this.delayed_lines) {
              if (entity["id"] === line && entity["alert"]["transit_realtime.mercury_alert"]["alert_type"] != "Delays") {
                this.not_delayed.push(line);
              }
            }
          }
        }
      }
    });
  }

  // @ts-ignore
  ngOnInit(): void {
    this.linesDelay();
    console.log("delayed lines ", this.delayed_lines);
    console.log("routes are ", this.routes);
    console.log("non delays ", this.not_delayed);
    // setInterval(() => {
    //   this.linesDelay();
    // }, 10000*10000);
  }

}
