import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { TemperaturePage } from "../pages/temperature/temperature";
import { AboutPage } from "../pages/about/about";
import { DataService } from "./data/data.service";
import { DummyDataService } from "./data/dummy.data.service";
import { HttpModule } from "@angular/http";
import { WebSocketService } from "./websocket/websocket.service";

@NgModule({
  declarations: [
    MyApp,
    TemperaturePage,
    AboutPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
    // ,
    // HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TemperaturePage,
    AboutPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, DataService, DummyDataService, WebSocketService]
})
export class AppModule {
}
