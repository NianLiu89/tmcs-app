import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { DataPoint } from "./datapoint";
import { Observable } from "rxjs/Rx";

@Injectable()
export class DataService {

    // private url: string = "http://192.168.2.6:8080/datapoints";
    private url: string = "http://192.168.2.252:8080/datapoints";
    // private url: string = "http://localhost:8080/datapoints";

    constructor(private http: Http) {
    }

    public getDataObserable(): Observable<DataPoint[]> {
        return Observable.interval(2000)
            .flatMap(() => this.http.get(this.url))
            .retryWhen(e => e.delay(1000)) // retry after 1 sec
            .share() // hot observable
            .map(this.extractDataPoints)
            .catch(this.handleError);
    }

    private extractDataPoints(response: Response): DataPoint[] {
        let body = response.json();
        if (body) {
            let rawData = response.json();
            return rawData.map(dp => {
                return new DataPoint(dp.code, dp.temperature);
            });
        }
        return [];
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        // return Observable.empty
        return Observable.throw(errMsg);
    }

}