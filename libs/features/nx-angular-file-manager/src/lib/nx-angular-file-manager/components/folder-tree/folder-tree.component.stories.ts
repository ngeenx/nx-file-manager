import type { Meta, StoryObj } from "@storybook/angular";
import { FolderTreeComponent } from "./folder-tree.component";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { FileType, IFile } from "@ngeenx/nx-file-manager-utils";
import { Folder, Flame, Star } from "lucide-angular";

const meta: Meta<FolderTreeComponent> = {
  component: FolderTreeComponent,
  title: "Folder Tree/Default/<nx-fm-folder-tree> Component",
};
export default meta;
type Story = StoryObj<FolderTreeComponent>;

const itemCount = 5;

const files = Array.from(
  { length: itemCount },
  (_, i) =>
    ({
      id: i,
      name: `Parent Folder ${i + 1}`,
      type: FileType.FOLDER,
      icon: Folder,
      isExpanded: true,
      items: Array.from(
        { length: itemCount },
        (_, j) =>
          ({
            id: j,
            name: `Sub Folder ${j + 1}`,
            type: FileType.FOLDER,
            isExpanded: true,
            icon: Flame,
            hasItems: true,
            items: Array.from(
              { length: itemCount },
              (_, k) =>
                ({
                  id: k,
                  name: `Sub Sub Folder ${k + 1}`,
                  type: FileType.FOLDER,
                  isExpanded: true,
                  icon: Star,
                  items: [],
                } as any as IFile)
            ),
          } as any as IFile)
      ),
    } as any as IFile)
);

export const Default: Story = {
  args: {
    files,
  },
  render: ({ files }) => ({
    template: `
      <div class="border-2 border-dashed border-gray-500 rounded-lg p-5 max-h-[400px] overflow-y-auto flex flex-col w-[300px] h-full">
        <nx-fm-folder-tree [files]="files"></nx-fm-folder-tree>
      </div>
    `,
    props: {
      files,
    },
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // find latest parent folder name
    expect(canvas.getByText(`Parent Folder ${files.length}`)).toBeTruthy();

    // count find second level folders
    expect(
      canvas.getAllByText(`Sub Folder ${files.length}`).length
    ).toStrictEqual(files.length);

    // count find third level folders
    expect(
      canvas.getAllByText(`Sub Sub Folder ${files.length}`).length
    ).toStrictEqual(files.length * files.length);
  },
};

const loadingFiles = Array.from(
  { length: itemCount },
  (_, i) =>
    ({
      id: i,
      name: `Parent Folder ${i + 1}`,
      type: FileType.FOLDER,
      icon: Folder,
      isExpanded: true,
      items: Array.from(
        { length: itemCount },
        (_, j) =>
          ({
            id: j,
            name: `Sub Folder ${j + 1}`,
            type: FileType.FOLDER,
            isExpanded: true,
            icon: Flame,
            hasItems: true,
            items: Array.from(
              { length: itemCount },
              (_, k) =>
                ({
                  id: k,
                  name: `Sub Sub Folder ${k + 1}`,
                  type: FileType.FOLDER,
                  isExpanded: true,
                  icon: Star,
                  items: [],
                } as any as IFile)
            ),
          } as any as IFile)
      ),
    } as any as IFile)
);

const setLoadingState = (file: IFile, state: boolean): void => {
  file.isLoading = state;

  if (file.items) {
    file.items.map((item) => setLoadingState(item, state));
  }
};

loadingFiles.map((file: IFile) => setLoadingState(file, true));

export const WithLoading: Story = {
  args: {
    files: loadingFiles,
  },
  render: ({ files }) => ({
    template: `
      <div class="border-2 border-dashed border-gray-500 rounded-lg p-5 max-h-[400px] overflow-y-auto flex flex-col w-[300px] h-full">
        <nx-fm-folder-tree [files]="files"></nx-fm-folder-tree>
      </div>
    `,
    props: {
      files,
    },
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // find latest parent folder name
    expect(canvas.getByText(`Parent Folder ${files.length}`)).toBeTruthy();

    // count find second level folders
    expect(
      canvas.getAllByText(`Sub Folder ${files.length}`).length
    ).toStrictEqual(files.length);

    // count find third level folders
    expect(
      canvas.getAllByText(`Sub Sub Folder ${files.length}`).length
    ).toStrictEqual(files.length * files.length);
  },
};
