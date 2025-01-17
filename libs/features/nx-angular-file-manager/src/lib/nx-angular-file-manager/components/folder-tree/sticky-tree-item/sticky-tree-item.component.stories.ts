import type { Meta, StoryObj } from '@storybook/angular';
import { StickyTreeItemComponent } from './sticky-tree-item.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<StickyTreeItemComponent> = {
  component: StickyTreeItemComponent,
  title: 'StickyTreeItemComponent',
};
export default meta;
type Story = StoryObj<StickyTreeItemComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/sticky-tree-item works!/gi)).toBeTruthy();
  },
};
