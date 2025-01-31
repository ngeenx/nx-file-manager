import { Component, OnInit } from "@angular/core";
import { ArrowLeft, ArrowRight, LucideAngularModule } from "lucide-angular";

@Component({
  selector: "nx-fm-breadcrumb-url-bar",
  templateUrl: "./breadcrumb-url-bar.component.html",
  standalone: true,
  imports: [LucideAngularModule],
})
export class BreadcrumbUrlBarComponent implements OnInit {
  public ArrowLeft = ArrowLeft;
  public ArrowRight = ArrowRight;

  constructor() {}

  ngOnInit() {}
}
