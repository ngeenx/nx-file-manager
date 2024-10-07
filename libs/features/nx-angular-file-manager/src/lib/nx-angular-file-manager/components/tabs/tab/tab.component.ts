import { Component, Input } from "@angular/core";
import { ITab } from "@ngeenx/nx-file-manager-utils";

@Component({
  selector: "nx-angular-tab",
  templateUrl: "./tab.component.html",
  standalone: true,
})
export class NxAngularTabComponent {
  @Input()
  public tabData: ITab = {
    id: 0,
    isSelected: false,
  } as ITab;
}
