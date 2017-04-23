
import { Injectable } from "@angular/core";
import { DataPoint } from "./datapoint";

@Injectable()
export class DummyDataService {

    public getDummyData(): DataPoint[] {
        // console.log("Refreshing data points!");
        return [
            this.aRandomDataPoint("TA1_BM"),
            this.aRandomDataPoint("TA2_BM"),
            this.aRandomDataPoint("TA3_BM"),
            this.aRandomDataPoint("TA4_BM"),
            this.aRandomDataPoint("TA5_BM"),
            this.aRandomDataPoint("TA6_BM"),
            this.aRandomDataPoint("TA7_BM"),
            this.aRandomDataPoint("TA8_BM"),
            this.aRandomDataPoint("TA9_BM"),
            this.aRandomDataPoint("TA10_BM"),
            this.aRandomDataPoint("TA11_BM"),
            this.aRandomDataPoint("TA12_BM"),
            this.aRandomDataPoint("TA13_BM"),
            this.aRandomDataPoint("TA14_BM"),
            this.aRandomDataPoint("TA15_BM"),
            this.aRandomDataPoint("TA16_BM"),
            this.aRandomDataPoint("TA17_BM")
        ];
    }

    private aRandomDataPoint(code: string): DataPoint {
        return new DataPoint(code, this.aRandomNumber(1, 200))
    }

    private aRandomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

}