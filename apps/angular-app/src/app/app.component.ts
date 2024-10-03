import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NxAngularFileManagerComponent } from "@ngeenx/nx-angular-file-manager";

@Component({
  standalone: true,
  imports: [RouterModule, NxAngularFileManagerComponent],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {}
