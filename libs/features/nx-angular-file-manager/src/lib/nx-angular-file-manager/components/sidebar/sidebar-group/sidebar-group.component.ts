import { Component, Input } from "@angular/core";
import { IFileGroup } from "@ngeenx/nx-file-manager-utils";
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: "nx-fm-sidebar-group",
  templateUrl: "./sidebar-group.component.html",
  standalone: true,
  imports: [LucideAngularModule],
})
export class NxAngularSidebarGroupComponent {
  @Input()
  public group!: IFileGroup;

  @Input()
  public iconSet!: { [key: string]: string };
}
