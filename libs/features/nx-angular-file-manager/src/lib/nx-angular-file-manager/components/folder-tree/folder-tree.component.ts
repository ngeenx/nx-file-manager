import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from "@angular/core";
import {
  IFile,
  IFileGroup,
  ScrollPosition,
  ScrollUtils,
} from "@ngeenx/nx-file-manager-utils";
import { timer } from "rxjs";
import { StickyTreeItemComponent } from "./sticky-tree-item/sticky-tree-item.component";

@Component({
  selector: "nx-fm-folder-tree",
  templateUrl: "./folder-tree.component.html",
  standalone: true,
  imports: [StickyTreeItemComponent],
})
export class FolderTreeComponent implements AfterViewInit {
  @ViewChild("folderTreeContainer", { static: true })
  private folderTreeContainerRef!: ElementRef;

  @Input()
  public iconSet!: { [key: string]: string };

  @Input()
  public files!: IFile[];

  public hasScrollableArea = false;
  public groupScrollPosition: ScrollPosition = ScrollPosition.MIDDLE;
  public ScrollPosition: typeof ScrollPosition = ScrollPosition;

  public ngAfterViewInit() {
    setInterval(() => {
      timer(100).subscribe(() => this.checkHasScroll());
    }, 500);
  }

  public onGroupContainerScroll(event: Event): void {
    if (event.target) {
      this.groupScrollPosition = ScrollUtils.isScrollbarClosestTo(
        event.target as HTMLElement,
        15
      );
    }

    const scrollHeightTop = (event.target as HTMLElement).scrollTop,
      currentElement = ScrollUtils.getTopVisibleElement(event);

    let curentElementTitleId = (currentElement as HTMLElement).querySelector(
      ".title"
    )?.id;

    if (scrollHeightTop < 15) {
      curentElementTitleId = "none";
    }

    if (currentElement) {
      (event.target as HTMLElement)
        ?.querySelectorAll(".title")
        .forEach((element: Element) => {
          if (element.id === curentElementTitleId) {
            element.classList.add("fixed-title");
          } else {
            element.classList.remove("fixed-title");
          }
        });
    }
  }

  private checkHasScroll(): void {
    const groupContainer = this.folderTreeContainerRef?.nativeElement;

    if (groupContainer) {
      this.hasScrollableArea = ScrollUtils.hasScrollbar(groupContainer);
    }
  }
}
