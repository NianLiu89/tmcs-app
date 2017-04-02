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
        let x = this.xLinearScale(this.width(), data); // [linear scale]
        // let x = this.xBandScale(this.width(), data) // [band scale]
        // .domain(data.map(function (d) {
        // let regex = /^(.*)_(.*)$/gi; // modifier gi:  g means global search, i means case insensitive
        // let result = regex.exec(d.position);
        // return result[1];
        // }))
        ;

        let y = this.yScale(this.height(), this.maxValueInData);

        // draw x axis
        svg.append("g")
            .attr("class", "axis axis-x")
            .call(
            d3.axisBottom(x)
                .tickSize(this.height())
                .tickValues(d3.range(data.length)) // [linear scale]
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
        let x = this.xLinearScale(this.width(), data); // [linear scale]
        // let x = this.xBandScale(this.width(), data) // [band scale]
        // .domain(data.map(function (d) { return d.position; }));
        let y = this.yScale(this.height(), this.maxValueInData);

        // line generator
        let lines = d3.line()
            .x(function (d, i) { return x(i); }) // [linear scale] need to add half band width to move the point to the middle
            // .x(function (d) { return x(d.position) + x.bandwidth() / 2 }) // [band scale] need to add half band width to move the point to the middle
            .y(function (d) { return y(d.temperature) });

        d3.select(".line")
            .transition()
            .duration(250)
            .attr("d", lines(data));
    }

    private xLinearScale(width: number, data: DataPoint[]): any {
        console.log(d3.range(data.length));
        return d3.scaleLinear()
            .range([0, width])
            .domain([0, data.length - 1]);
    }

    private xBandScale(width: number, data: DataPoint[]): any {
        return d3.scaleBand()
            .range([0, width]);
    }

    private yScale(height: number, maximum: number): any {
        return d3.scaleLinear()
            .range([height, 0])
            .domain([0, maximum]);
    }

}