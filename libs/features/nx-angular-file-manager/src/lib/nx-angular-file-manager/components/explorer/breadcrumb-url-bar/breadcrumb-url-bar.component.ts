import { Component, Input } from "@angular/core";
import { IBreadcrumbItem } from "@ngeenx/nx-file-manager-utils";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  LucideAngularModule,
} from "lucide-angular";
import { BreadcrumbItemComponent } from "./breadcrumb-item/breadcrumb-item.component";

@Component({
  selector: "nx-fm-breadcrumb-url-bar",
  templateUrl: "./breadcrumb-url-bar.component.html",
  standalone: true,
  imports: [LucideAngularModule, BreadcrumbItemComponent],
})
export class BreadcrumbUrlBarComponent {
  @Input()
  public rootCrumb!: IBreadcrumbItem;

  @Input()
  public breadcrumbs!: IBreadcrumbItem[];

  public ChevronRight = ChevronRight;

  public ArrowLeft = ArrowLeft;
  public ArrowRight = ArrowRight;
}
