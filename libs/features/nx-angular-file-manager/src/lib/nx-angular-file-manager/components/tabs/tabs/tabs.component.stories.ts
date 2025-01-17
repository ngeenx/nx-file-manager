import type { Meta, StoryObj } from '@storybook/angular';
import { NxAngularTabsComponent } from './tabs.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<NxAngularTabsComponent> = {
  component: NxAngularTabsComponent,
  title: 'NxAngularTabsComponent',
};
export default meta;
type Story = StoryObj<NxAngularTabsComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/tabs works!/gi)).toBeTruthy();
  },
};
