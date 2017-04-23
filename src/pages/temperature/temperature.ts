import { Component, OnInit, ViewChild } from "@angular/core";
import { Slides } from 'ionic-angular';
import * as d3 from "d3";
import * as $ from "jquery";
import { DataService } from "../../app/data/data.service";
import { Observable } from "rxjs/Rx";
import { DataPoint } from "../../app/data/datapoint";
import { TemperatureChart } from "./temperature.chart";
import { Margin } from "../shared/margin";
import { DummyDataService } from "../../app/data/dummy.data.service";

@Component({
  selector: 'page-temperature',
  templateUrl: 'temperature.html'
})

export class TemperaturePage implements OnInit {
  private canvasId = "canvas";
  private margin: Margin = { left: 30, right: 30, top: 40, bottom: 55 };
  // private data: DataPoint[] = this.dataService.getData();
  // private data: DataPoint[] = this.dummyDataService.getDummyData();
  private data: DataPoint[] = [];
  private lastDataSize: number = 0;
  private maximum: number = 200;

  @ViewChild(Slides) slides: Slides;

  private chart: TemperatureChart;
  constructor(private dataService: DataService, private dummyDataService: DummyDataService) {
    // HTMLs defined in the template are not ready in this phase.
    this.chart = new TemperatureChart(this.canvasId, this.maximum, this.margin);
  }

  ngOnInit(): void {
    this.dataService.getDataObserable()
      .subscribe(
      data => {
        $(".swiper-slide-active").css("background-color", "green");
        this.data = data;
        if (this.lastDataSize != this.data.length) {
          console.log('this is a redrawing');
          this.chart.draw(this.data)
          this.lastDataSize = this.data.length;
        } else {
          console.log('this is an updateing');
          this.chart.update(this.data);
        }
      },
      error => {
        $(".swiper-slide-active").css("background-color", "red");
      }
      );

    window.addEventListener("resize", () => { this.chart.draw(this.data) });
  }

}
