import { Component, Input } from "@angular/core";
import { IFileGroup } from "@ngeenx/nx-file-manager-utils";
import { LucideAngularModule, ChevronDown, ChevronUp } from "lucide-angular";

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

  public ChevronDown = ChevronDown;
  public ChevronUp = ChevronUp;

  public onGroupClick(group: IFileGroup): void {
    group.isExpanded = !group.isExpanded;
  }
}
