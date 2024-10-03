import { Component, Input } from "@angular/core";

@Component({
  selector: "nx-angular-explorer",
  templateUrl: "./explorer.component.html",
  standalone: true,
})
export class ExplorerComponent {
  @Input()
  public iconSet!: { [key: string]: string };
}
