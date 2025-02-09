import { IBreadcrumbItem } from "./breadcrumb.model";
import { IFile } from "./file.model";

export interface ITab {
  id: string | number;
  name: string;
  path: string;
  currentFolder: IFile;
  isSelected?: boolean;
  files: IFile[];

  // navigation
  rootCrumb: IBreadcrumbItem;
  breadcrumbs: IBreadcrumbItem[];
}
