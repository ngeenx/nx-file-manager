import type { Meta, StoryObj } from '@storybook/angular';
import { FolderTreeComponent } from './folder-tree.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<FolderTreeComponent> = {
  component: FolderTreeComponent,
  title: 'FolderTreeComponent',
};
export default meta;
type Story = StoryObj<FolderTreeComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/folder-tree works!/gi)).toBeTruthy();
  },
};
