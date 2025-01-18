import type { Meta, StoryObj } from "@storybook/angular";
import { NxAngularFileManagerComponent } from "./nx-angular-file-manager.component";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { defaultOptions } from "@ngeenx/nx-file-manager-utils";

const meta: Meta<NxAngularFileManagerComponent> = {
  component: NxAngularFileManagerComponent,
  title: "NxAngularFileManagerComponent",
};
export default meta;
type Story = StoryObj<NxAngularFileManagerComponent>;

export const Primary: Story = {
  args: {
    fileContextMenuItems: [],
    explorerContextMenuItems: [],
    options: defaultOptions,
  },
};

export const Heading: Story = {
  args: {
    fileContextMenuItems: [],
    explorerContextMenuItems: [],
    options: defaultOptions,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/nx-angular-file-manager works!/gi)).toBeTruthy();
  },
};
