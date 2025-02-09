import { Component, Input } from "@angular/core";
import { IBreadcrumbItem } from "@ngeenx/nx-file-manager-utils";
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: "nx-fm-breadcrumb-item",
  templateUrl: "./breadcrumb-item.component.html",
  standalone: true,
  imports: [LucideAngularModule],
})
export class BreadcrumbItemComponent {
  @Input()
  public breadcrumbItem!: IBreadcrumbItem;
}
