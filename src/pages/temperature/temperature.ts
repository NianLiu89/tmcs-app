import { Component, OnInit } from "@angular/core";
import * as d3 from "d3";

@Component({
  selector: 'page-temperature',
  templateUrl: 'temperature.html'
})
export class TemperaturePage implements OnInit {

  dummyText: string = "Bla bla bla";
  private data = [
    { slot: 1, temp: 150 }
    , { slot: 2, temp: 100 }
    , { slot: 3, temp: 120 }
    , { slot: 4, temp: 50 }
    , { slot: 5, temp: 0 }
  ];

  constructor() {

  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    let container = document.getElementById("canvas")
      , margin = { left: 20, right: 20, top: 50, bottom: 50 }
      , width = container.clientWidth - margin.left - margin.right
      , height = container.clientHeight - margin.top - margin.bottom
      ;

    console.log("Full width: " + container.clientWidth);
    console.log("Paint width: " + width);
    console.log("Full height: " + container.clientHeight);
    console.log("Paint height: " + height);

    let svg = d3.select(container).append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .style("border", "1px solid black")
      , g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("border", "1px solid black")
      ;

    let x = d3.scaleLinear()
      .range([0, width])
      .domain(d3.extent(this.data, function (d) { return d.slot; }));

    let y = d3.scaleLinear()
      .range([height, 0])
      .domain(d3.extent(this.data, function (d) { return d.temp; }));

    let valueLine = d3.line()
      .x(function (d) { return x(d.slot) })
      .y(function (d) { console.log(y(d.temp)); return y(d.temp) });

    g.append("path")
      .data([this.data])
      .attr("class", "line")
      .attr("d", valueLine)
      .style("border", "1px solid black")
      ;

  }

}
