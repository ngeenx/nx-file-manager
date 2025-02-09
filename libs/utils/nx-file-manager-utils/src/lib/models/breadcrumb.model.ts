import { IFile } from "./file.model";

export interface IBreadcrumbItem {
  file: IFile;
  isLoading?: boolean;
  isDisabled?: boolean;

  onClick: () => void;
}
