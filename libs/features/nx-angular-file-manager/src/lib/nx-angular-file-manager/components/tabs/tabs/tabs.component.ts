import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { NxAngularTabComponent } from "../tab/tab.component";
import { ITab } from "@ngeenx/nx-file-manager-utils";

@Component({
  selector: "nx-angular-tabs",
  templateUrl: "./tabs.component.html",
  standalone: true,
})
export class NxAngularTabsComponent implements AfterContentInit {
  @ContentChildren(NxAngularTabComponent)
  public tabs!: QueryList<NxAngularTabComponent>;

  @Output()
  public addNewTab: EventEmitter<void> = new EventEmitter();

  @Output()
  public tabClick: EventEmitter<ITab> = new EventEmitter();

  @Output()
  public tabClose: EventEmitter<ITab> = new EventEmitter();

  public ngAfterContentInit(): void {
    if (
      this.tabs?.filter((tab: NxAngularTabComponent) => tab.tabData.isSelected)
        .length === 0
    ) {
      this.onTabSelect(this.tabs.first);
    }
  }

  public onTabSelect(targetTab: NxAngularTabComponent): void {
    this.tabs.forEach((tab: NxAngularTabComponent) => {
      tab.tabData.isSelected = tab === targetTab;
    });

    this.tabClick.emit(targetTab.tabData);
  }

  public onNewTabClick(): void {
    this.addNewTab.emit();
  }

  public onTabClose(targetTab: ITab): void {
    this.tabClose.emit(targetTab);
  }
}
