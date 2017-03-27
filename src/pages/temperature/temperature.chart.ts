import * as d3 from "d3";
import { DataPoint } from "../../app/data/datapoint";
import * as $ from "jquery";
import { OnInit } from "@angular/core";

export class TemperatureChart implements OnInit {
    private margin = { left: 30, right: 30, top: 40, bottom: 55 };

    private maximum: number;
    private canvasId: string;
    private canvas = () => { return document.getElementById(this.canvasId); };

    constructor(canvasId: string, maximum: number) {
        this.canvasId = canvasId;
        this.maximum = maximum;
    }

    ngOnInit(): void {
    }

    public draw(data: DataPoint[]): void {

        // if is first time draw the chart
        if (d3.select(this.canvas()).select("svg").empty()) {
            d3.select(this.canvas())
                .append("svg")
                .append("g")
                .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
                .append("path")
                .attr("class", "line")
                ;
        }

        let svg = d3.select(this.canvas()).select("svg").select("g"),
            // width = this.canvas.clientWidth - this.margin.left - this.margin.right,
            width = $(window).width() - this.margin.left - this.margin.right,
            height = $(window).height() - this.margin.top - this.margin.bottom;
        // height = this.canvas.clientHeight - this.margin.top - this.margin.bottom;

        let x = this.xScale(width, data);
        let y = this.yScale(height, this.maximum);

        // draw line
        let lines = d3.line()
            .x(function (data, index) { return x(index + 1) })
            .y(function (d) { return y(d.temperature) });

        svg.select("path")
            .attr("d", lines(data))
            .style("border", "1px solid black");

        // draw y axis
        svg.append("g")
            .attr("class", "axis axis-y")
            .call(d3.axisRight(y).ticks(5).tickSize(width))
            .append("text")
            .text("温度 (℃)")
            .attr("y", -this.margin.top * 0.5)
            ;

        // draw x axis
        svg.append("g")
            .attr("class", "axis axis-x")
            .call(d3.axisBottom(x)
                .tickSize(height)
                .tickValues(d3.range(1, data.length + 1))
                .tickFormat(d3.format("d"))  // digit
            )
            .append("text")
            .text("车位")
            .attr("transform", "translate(" + width + "," + (height + this.margin.bottom * 0.7) + ")")
            ;

        // style axes
        svg.selectAll(".domain").remove();
        svg.selectAll(".axis-y .tick text").attr("x", - (this.margin.left - 5));
        svg.selectAll(".axis-x .tick text").attr("dy", 20);
    }

    public update(data: DataPoint[]): void {
        let svg = d3.select(this.canvas()).transition();

        let width = $(window).width() - this.margin.left - this.margin.right,
            height = $(window).height() - this.margin.top - this.margin.bottom;

        let x = this.xScale(width, data);
        let y = this.yScale(height, this.maximum);

        // draw line
        let lines = d3.line()
            .x(function (data, index) { return x(index + 1) })
            .y(function (d) { return y(d.temperature) });

        svg.select(".line")
            .duration(250)
            .attr("d", lines(data));
    }

    private xScale(width: number, data: DataPoint[]): any {
        return d3.scaleLinear()
            .range([0, width])
            .domain(d3.extent(data, function (data, index) { return index + 1 }));
    }

    private yScale(height: number, maximum: number): any {
        return d3.scaleLinear()
            .range([height, 0])
            .domain([0, maximum]) //暂时设置温度上限为200度
            ;
    }
}