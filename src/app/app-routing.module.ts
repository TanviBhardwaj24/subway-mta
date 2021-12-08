import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubwayStatusComponent} from "./components/subway-status/subway-status.component";
import {RouterModule, Routes} from "@angular/router";
import {LineStatusComponent} from "./components/line-status/line-status.component";
import {UptimeComponent} from "./components/uptime/uptime.component";


const routes: Routes = [
  {path: 'subwaystatus', component: SubwayStatusComponent},
  {path: 'status', component: LineStatusComponent},
  {path: 'uptime', component: UptimeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
