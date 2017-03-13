import { Component, OnInit } from "@angular/core";
import * as d3 from "d3";

@Component({
  selector: 'page-temperature',
  templateUrl: 'temperature.html'
})
export class TemperaturePage implements OnInit {

  dummyText: string = "Nian Liu";

  constructor() {

  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log("hello world, I'm in onInit method");

    d3.select("page-temperature")
      .style("height", "100%");

    d3.select("#canvas")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      // .style("background-color", "red")
      ;

    d3.select("#canvas")
      .append("h1")
      .text("hello world")
      ;
  }



}
