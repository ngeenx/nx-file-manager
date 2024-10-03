import { Component, Input } from "@angular/core";
import { IFileGroup } from "@ngeenx/nx-file-manager-utils";

@Component({
  selector: "nx-angular-sidebar-group",
  templateUrl: "./sidebar-group.component.html",
  standalone: true,
})
export class NxAngularSidebarGroupComponent {
  @Input()
  public group!: IFileGroup;

  @Input()
  public iconSet!: { [key: string]: string };
}
