import type { Meta, StoryObj } from '@storybook/angular';
import { TreeItemComponent } from './tree-item.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<TreeItemComponent> = {
  component: TreeItemComponent,
  title: 'TreeItemComponent',
};
export default meta;
type Story = StoryObj<TreeItemComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/tree-item works!/gi)).toBeTruthy();
  },
};
