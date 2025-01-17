import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from "@angular/core";
import {
  IFile,
  ScrollPosition,
  ScrollUtils,
} from "@ngeenx/nx-file-manager-utils";
import { timer } from "rxjs";
import { StickyTreeItemComponent } from "./sticky-tree-item/sticky-tree-item.component";
import {
  ContextMenuComponent,
  ContextMenuModule,
  ContextMenuService,
} from "@perfectmemory/ngx-contextmenu";
import {
  FolderTreeContextMenuService,
  IFolderTreeFileContextMenuEvent,
} from "../../services/folder-tree-context-menu.service";

@Component({
  selector: "nx-fm-folder-tree",
  templateUrl: "./folder-tree.component.html",
  standalone: true,
  providers: [FolderTreeContextMenuService],
  imports: [StickyTreeItemComponent, ContextMenuModule],
})
export class FolderTreeComponent implements AfterViewInit {
  @ViewChild("folderTreeContainer", { static: true })
  private folderTreeContainerRef!: ElementRef;

  @ViewChild("folderTreeContextMenu", { static: true })
  private folderTreeContextMenuRef!: ContextMenuComponent<any>;

  @Input()
  public files!: IFile[];

  public hasScrollableArea = false;
  public groupScrollPosition: ScrollPosition = ScrollPosition.MIDDLE;
  public ScrollPosition: typeof ScrollPosition = ScrollPosition;

  constructor(
    private contextMenuService: ContextMenuService<any>,
    private folderTreeContextMenuService: FolderTreeContextMenuService
  ) {
    this.folderTreeContextMenuService.contextMenuTrigger.subscribe(
      (event: IFolderTreeFileContextMenuEvent): void => {
        this.contextMenuService.closeAll();

        this.contextMenuService.show(this.folderTreeContextMenuRef, {
          x: event.event.clientX,
          y: event.event.clientY,
          value: event,
        });
      }
    );
  }

  public ngAfterViewInit() {
    timer(100).subscribe(() => this.checkHasScroll());
  }

  public onFolderTreeContextMenuClick(event: {
    event: MouseEvent | KeyboardEvent;
    value?: any;
  }): void {
    console.log(event);
  }

  public onFolderTreeScroll(event: Event): void {
    if (event.target) {
      this.groupScrollPosition = ScrollUtils.isScrollbarClosestTo(
        event.target as HTMLElement,
        15
      );
    }

    const currentElement = ScrollUtils.getTopVisibleElement(event);

    let curentElementTitleId = (currentElement as HTMLElement).querySelector(
      ".title"
    )?.id;

    // reset current element id
    if ((event.target as HTMLElement).scrollTop < 15) {
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
    const folderTreeElement = this.folderTreeContainerRef?.nativeElement;

    if (folderTreeElement) {
      this.hasScrollableArea = ScrollUtils.hasScrollbar(folderTreeElement);
    }
  }
}
