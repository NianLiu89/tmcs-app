import { Injectable, OnInit } from "@angular/core";
import { Http, Response } from "@angular/http";
import { DataPoint } from "./datapoint";
import { Observable } from "rxjs/Rx";

@Injectable()
export class DataService implements OnInit {

    private url: string = "http://192.168.2.1:8080/datapoints";

    constructor(private http: Http) {
        console.log("DataService constructor");
        let timer = Observable.timer(0, 5000);
        timer.subscribe(() => {
            this.getData();
        })
    }

    ngOnInit(): void {
        console.log("DataService ngOnInit");

    }

    public getData(): void {
        this.http.get(this.url)
            // .map((d, i) => { console.log(d); console.log(i); return d.json })
            ;
        return null;
    }

}