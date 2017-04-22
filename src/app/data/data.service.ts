import { Injectable, OnInit } from "@angular/core";
import { Http, Response } from "@angular/http";
import { DataPoint } from "./datapoint";
import { Observable } from "rxjs/Rx";
import { Subject } from "rxjs/Subject";
import { WebSocketService } from "../websocket/websocket.service";

@Injectable()
export class DataService implements OnInit {

    // private url: string = "http://192.168.2.1:8080/datapoints";
    private url: string = "http://localhost:8080/datapoints";

    private data: any;

    private message: Subject<string>;

    constructor(private http: Http, private webSocketService: WebSocketService) {
        <Subject<string>>webSocketService
            .connect("ws://localhost:8080/chat/topic/msg")
            .map((response: MessageEvent): string => {
                console.log("message");
                console.log(JSON.stringify(response));
                console.log(response);
                return JSON.stringify(response);
            });


        console.log("DataService constructor");
        let timer = Observable.timer(0, 5000);
        timer.subscribe(() => {
        })

        this.getData();
    }

    ngOnInit(): void {
        console.log("DataService ngOnInit");

    }

    public getData(): void {
        this.http.get(this.url)
            .map(response => { console.log(response) })
            .subscribe(
            result => { console.log(result); this.data = result }
            )
            ;
    }

}