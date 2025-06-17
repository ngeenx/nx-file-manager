import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from "@angular/core";
import { IBreadcrumbItem, ITab } from "@ngeenx/nx-file-manager-utils";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  LucideAngularModule,
} from "lucide-angular";
import { BreadcrumbItemComponent } from "./breadcrumb-item/breadcrumb-item.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { timer } from "rxjs";

@Component({
  selector: "nx-fm-breadcrumb-url-bar",
  templateUrl: "./breadcrumb-url-bar.component.html",
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    BreadcrumbItemComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class BreadcrumbUrlBarComponent implements OnChanges {
  @ViewChild("urlBarInput")
  public urlBarInput!: ElementRef;

  @Input()
  public rootCrumb!: IBreadcrumbItem;

  @Input()
  public breadcrumbs!: IBreadcrumbItem[];

  @Input()
  public tab!: ITab;

  public history: IBreadcrumbItem[] = [];
  public isUrlMode = false;
  public breadcrumbsUrl = "";

  public ChevronRight = ChevronRight;
  public ArrowLeft = ArrowLeft;
  public ArrowRight = ArrowRight;

  public ngOnChanges(): void {
    this.breadcrumbsUrl =
      this.rootCrumb.file.name +
      "/" +
      this.breadcrumbs.map((b: IBreadcrumbItem) => b.file.name).join("/");
  }

  public onBreadcrumbBarClick(event: MouseEvent): void {
    event.stopPropagation();

    this.isUrlMode = true;

    timer(100).subscribe(() => this.urlBarInput.nativeElement.focus());
  }

  public onBreadcrumbItemClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  public onUrlChange(event: Event): void {
    console.log(event);
  }

  public onUrlBarBlur(): void {
    this.isUrlMode = false;
  }
}
