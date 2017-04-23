import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage implements OnInit {



  constructor() {

  }

  ngOnInit(): void {
    this.connect();
  }


  public connect() {
    let ws = new WebSocket('ws://localhost:8080/chat');
    console.log('socket');
    ws.onopen = function () {
      console.log('opening socket');
    };
    ws.onmessage = function (data) {
      console.log('new message!');
      console.log(data);
    };

    $("#btn").click(function () {
      console.log('sending message to server');
      ws.send('hello websocket from client');
    });

    $("#testId").on("click", function () {
      console.log('sending message to server');
      ws.send('hello websocket from client');
    });
  }
}
