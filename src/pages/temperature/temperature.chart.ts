import * as d3 from "d3";
import { DataPoint } from "../../app/data/datapoint";
import * as $ from "jquery";
import { Margin } from "../shared/margin";

export class TemperatureChart {
    private margin: Margin;          // 边框距离， 上下左右的边距
    private maxValueInData: number;  // 测点数据中的温度上限
    private canvasId: string;        // 图形生成于id为这个变量值的DOM中
    private canvas = () => { return document.getElementById(this.canvasId); };
    // private svg = () => { return d3.select(this.canvas()).select("svg").select("g"); };
    private width = () => { return $(window).width() - this.margin.left - this.margin.right; };
    private height = () => { return $(window).height() - this.margin.top - this.margin.bottom; };

    constructor(canvasId: string, maxValueInData: number, margin: Margin) {
        this.canvasId = canvasId;
        this.maxValueInData = maxValueInData;
        this.margin = margin;
    }

    public draw(data: DataPoint[]): void {
        // wipe out existing graphs
        d3.select(this.canvas()).select("svg").remove();

        // if is first time draw the chart
        if (d3.select(this.canvas()).select("svg").empty()) {
            // initialize all components
            d3.select(this.canvas())
                .append("svg")
                .append("g")
                .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
                .append("path")
                .attr("class", "line")
                ;
        }

        let svg = d3.select(this.canvas()).select("svg").select("g");
        // let x = this.xScale(this.width(), data);
        let x = d3.scaleBand()
            .range([0, this.width()])
            .domain(data.map(function (d) { return d.position; }));
        let y = this.yScale(this.height(), this.maxValueInData);

        // draw x axis
        svg.append("g")
            .attr("class", "axis axis-x")
            .call(
            d3.axisBottom(x)
                .tickSize(this.height())
            // .tickValues(d3.range(data.length)) // for linear scale
            )
            .append("text")
            .text("车位")
            .attr("transform", "translate(" + this.width() + "," + (this.height() + this.margin.bottom * 0.7) + ")")
            ;

        // draw y axis
        svg.append("g")
            .attr("class", "axis axis-y")
            .call(d3.axisRight(y)
                .ticks(5)
                .tickSize(this.width()))
            .append("text")
            .text("温度 (℃)")
            .attr("y", -this.margin.top * 0.5)
            ;

        // style axes
        svg.selectAll(".domain").remove();
        svg.selectAll(".axis-y .tick text").attr("x", - (this.margin.left - 5));
        svg.selectAll(".axis-x .tick text").attr("dy", 20);

        // rander line
        this.update(data);
    }

    public update(data: DataPoint[]): void {
        let x = this.xScale(this.width(), data);
        // let x = this.xBandScale(this.width(), data);
        let y = this.yScale(this.height(), this.maxValueInData);

        // line generator
        let lines = d3.line()
            .x(function (data, index) { return x(index) })
            .y(function (d) { return y(d.temperature) });

        d3.select(".line")
            .transition()
            .duration(250)
            .attr("d", lines(data));
    }

    private xScale(width: number, data: DataPoint[]): any {
        console.log(d3.range(data.length));
        return d3.scaleLinear()
            .range([0, width])
            .domain([0, data.length - 1]);
    }

    private yScale(height: number, maximum: number): any {
        return d3.scaleLinear()
            .range([height, 0])
            .domain([0, maximum]);
    }

    private xBandScale(width: number, data: DataPoint[]): any {
        console.log(d3.range(data.length));
        return d3.scaleBand()
            .range([0, width])
            .domain(d3.range(data.length));
    }
}