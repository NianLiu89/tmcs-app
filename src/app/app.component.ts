import {Component} from "@angular/core";
import {Platform} from "ionic-angular";
import {StatusBar, Splashscreen} from "ionic-native";


@Component({
  templateUrl: 'app.html',
  styleUrls: ['/src/app/app.scss']
})
export class MyApp {


  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
