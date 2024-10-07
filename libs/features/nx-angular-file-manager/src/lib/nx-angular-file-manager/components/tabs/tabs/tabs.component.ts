import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { NxAngularTabComponent } from "../tab/tab.component";

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
  }

  public onNewTabClick(): void {
    this.addNewTab.emit();
  }
}
