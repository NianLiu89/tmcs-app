import { Component, OnInit } from "@angular/core";
import * as d3 from "d3";
import * as $ from "jquery";
// import $ from "jquery";

@Component({
  selector: 'page-temperature',
  templateUrl: 'temperature.html'
})

export class TemperaturePage implements OnInit {
  private canvasId = "canvas";
  private margin = { left: 30, right: 30, top: 40, bottom: 55 };
  private data = [
    { slot: 1, temp: 150.278 }
    , { slot: 2, temp: 75.45123 }
    , { slot: 3, temp: 125.1212 }
    , { slot: 4, temp: 25.11111 }
    , { slot: 5, temp: 100.00009 }
    , { slot: 6, temp: 50.2348 }
  ];

  constructor() {
    // HTMLs defined in the template are not ready in this phase.
  }

  ngOnInit(): void {
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
      .domain(d3.extent(this.data, function (d) { return d.slot; })),
      y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(this.data, function (d) { return d.temp })]);

    // draw line
    let lines = d3.line()
      .x(function (d) { console.log("x : " + x(d.slot)); return x(d.slot) })
      .y(function (d) { return y(d.temp) });

    svg.select("path")
      .attr("d", lines(this.data))
      .style("border", "1px solid black");

    // draw y axis
    svg.append("g")
      .attr("class", "axis axis-y")
      .call(d3.axisRight(y).ticks(6).tickSize(width))
      .append("text")
      .attr("fill", "#000")
      .text("温度 (℃)")
      .attr("font-size", "15px")
      .attr("x", - (margin.left - 5))
      .attr("y", -10)
      ;

    svg.append("g")
      .attr("class", "axis axis-x")
      // .attr("transform", "translate(0, " + height + ")")
      // .call(d3.axisTop(x).tickSize(height))
      .call(d3.axisBottom(x)
        .tickSize(height)
        .tickValues(d3.range(1, this.data.length + 1.))
        .tickFormat(d3.format("d"))
      )
      .append("text")
      .attr("fill", "#000")
      .text("车位")
      .attr("font-size", "15px")
      .attr("transform", "translate(" + width + "," + (height + margin.bottom * 0.7) + ")")
      ;

    svg.select(".domain").remove();
    svg.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#555").attr("stroke-dasharray", "5,5");
    svg.selectAll(".tick text").attr("font-size", "15px");

    svg.selectAll(".axis-y .tick text").attr("x", - (margin.left - 5)).attr("dy", -4);
    svg.selectAll(".axis-x .tick text").attr("dy", 20);
  }
}
