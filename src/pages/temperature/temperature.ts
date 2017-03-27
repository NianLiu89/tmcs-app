import { Component, OnInit } from "@angular/core";
import * as d3 from "d3";
import * as $ from "jquery";
import { DataService } from "../../app/data/data.service";
import { Observable } from "rxjs/Rx";
import { DataPoint } from "../../app/data/datapoint";
// import $ from "jquery";

@Component({
  selector: 'page-temperature',
  templateUrl: 'temperature.html'
})

export class TemperaturePage implements OnInit {
  private canvasId = "canvas";
  private margin = { left: 30, right: 30, top: 40, bottom: 55 };
  private dataSet: DataPoint[] = this.dataService.getData();

  constructor(private dataService: DataService) {
    // HTMLs defined in the template are not ready in this phase.
  }

  ngOnInit(): void {
    let timer = Observable.timer(2000, 1000);
    timer.subscribe(t => {
      this.dataSet = this.dataService.getData();
      this.update(this.margin);
    });

    console.log(this.dataSet);
    this.drawChart(this.canvasId, this.margin);
    window.addEventListener("resize", () => { this.drawChart(this.canvasId, this.margin) });
  }

  private drawChart(canvasId: string, margin: any): void {
    let canvas = document.getElementById(canvasId);

    // if is first time draw the chart
    if (d3.select(canvas).select("svg").empty()) {
      d3.select(canvas)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .style("border", "2px solid black")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .append("path")
        .attr("class", "line")
        ;
    }

    let svg = d3.select(canvas).select("svg").select("g"),
      width = canvas.clientWidth - margin.left - margin.right,
      height = canvas.clientHeight - margin.top - margin.bottom;

    let x = d3.scaleLinear()
      .range([0, width])
      .domain(d3.extent(this.dataSet, function (data, index) { return index + 1 })),
      y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 200]) //暂时设置温度上限为200度
      ;

    // draw line
    let lines = d3.line()
      .x(function (data, index) { return x(index + 1) })
      .y(function (d) { return y(d.temperature) });

    svg.select("path")
      .attr("d", lines(this.dataSet))
      .style("border", "1px solid black");

    // draw y axis
    svg.append("g")
      .attr("class", "axis axis-y")
      .call(d3.axisRight(y).ticks(5).tickSize(width))
      .append("text")
      .text("温度 (℃)")
      .attr("y", -margin.top * 0.5)
      // .attr("x", - (margin.left - 5))
      ;

    // draw x axis
    svg.append("g")
      .attr("class", "axis axis-x")
      .call(d3.axisBottom(x)
        .tickSize(height)
        .tickValues(d3.range(1, this.dataSet.length + 1))
        .tickFormat(d3.format("d"))  // digit
      )
      .append("text")
      .text("车位")
      .attr("transform", "translate(" + width + "," + (height + margin.bottom * 0.7) + ")")
      ;

    svg.selectAll(".domain").remove();
    // svg.selectAll(".tick:not(:first-of-type) line")
    svg.selectAll(".tick line")
      .attr("stroke", "#555")
      .attr("stroke-dasharray", "5,5");
    svg.selectAll(".tick text")
      .attr("font-size", "15px")
      .attr("font-weight", "bold");

    svg.selectAll(".axis-y .tick text").attr("x", - (margin.left - 5)).attr("dy", -4);
    svg.selectAll(".axis-x .tick text").attr("dy", 20);
  }

  private update(margin: any): void {

    let canvas = document.getElementById(this.canvasId);
    let svg = d3.select(canvas).transition();

    let width = canvas.clientWidth - margin.left - margin.right,
      height = canvas.clientHeight - margin.top - margin.bottom;

    let x = d3.scaleLinear()
      .range([0, width])
      .domain(d3.extent(this.dataSet, function (data, index) { return index + 1 })),
      y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 200]) //暂时设置温度上限为200度
    // .domain([0, d3.max(this.dataSet, function (d) { return d.temperature })]);

    // draw line
    let lines = d3.line()
      .x(function (data, index) { return x(index + 1) })
      .y(function (d) { return y(d.temperature) });

    svg.select(".line")
      .duration(250)
      .attr("d", lines(this.dataSet));
  }
}
