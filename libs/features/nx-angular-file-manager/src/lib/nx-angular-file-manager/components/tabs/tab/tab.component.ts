import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ITab } from "@ngeenx/nx-file-manager-utils";

@Component({
  selector: "nx-angular-tab",
  templateUrl: "./tab.component.html",
  standalone: true,
  imports: [CommonModule],
})
export class NxAngularTabComponent {
  @Input()
  public tabData: ITab = {} as ITab;
}
