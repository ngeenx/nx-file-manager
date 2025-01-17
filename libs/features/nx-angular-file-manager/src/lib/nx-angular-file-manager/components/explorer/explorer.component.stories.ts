import type { Meta, StoryObj } from '@storybook/angular';
import { ExplorerComponent } from './explorer.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ExplorerComponent> = {
  component: ExplorerComponent,
  title: 'ExplorerComponent',
};
export default meta;
type Story = StoryObj<ExplorerComponent>;

export const Primary: Story = {
  args: {
    isFreezed: true,
    fileContextMenuItems: [],
    explorerContextMenuItems: [],
  },
};

export const Heading: Story = {
  args: {
    isFreezed: true,
    fileContextMenuItems: [],
    explorerContextMenuItems: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/explorer works!/gi)).toBeTruthy();
  },
};
