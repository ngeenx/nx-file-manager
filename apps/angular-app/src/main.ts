import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";

import { Ray, ray } from "node-ray/web";

// set several settings at once:
Ray.useDefaultSettings({
  host: "localhost",
  port: 23517,
});

(window as any).ray = ray;

ray("Hello from Angular!");

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
