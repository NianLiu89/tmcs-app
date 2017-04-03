import { Component, OnInit } from "@angular/core";
import * as d3 from "d3";
import * as $ from "jquery";
import { DataService } from "../../app/data/data.service";
import { Observable } from "rxjs/Rx";
import { DataPoint } from "../../app/data/datapoint";
import { TemperatureChart } from "./temperature.chart";
import { Margin } from "../shared/margin";
// import $ from "jquery";

@Component({
  selector: 'page-temperature',
  templateUrl: 'temperature.html'
})

export class TemperaturePage implements OnInit {
  private canvasId = "canvas";
  private margin: Margin = { left: 30, right: 30, top: 40, bottom: 55 };
  private data: DataPoint[] = this.dataService.getData();
  private maximum: number = 200;


  private chart: TemperatureChart;
  constructor(private dataService: DataService) {
    // HTMLs defined in the template are not ready in this phase.
    this.chart = new TemperatureChart(this.canvasId, this.maximum, this.margin);
  }

  ngOnInit(): void {
    let timer = Observable.timer(2000, 1000);
    timer.subscribe(t => {
      this.data = this.dataService.getData();
      this.chart.update(this.data);
    });

    // console.log(this.data);
    this.chart.draw(this.data);
    window.addEventListener("resize", () => { this.chart.draw(this.data) });
  }
}
