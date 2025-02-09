import { IFile } from "./file.model";
import { ITab } from "./tab.model";

export interface IBreadcrumbItem {
  file: IFile;
  isLoading?: boolean;
  isDisabled?: boolean;

  onClick: (tab: ITab, breadcrumbItem: IBreadcrumbItem) => void;
}
