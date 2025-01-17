import type { Meta, StoryObj } from '@storybook/angular';
import { NxAngularTabComponent } from './tab.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<NxAngularTabComponent> = {
  component: NxAngularTabComponent,
  title: 'NxAngularTabComponent',
};
export default meta;
type Story = StoryObj<NxAngularTabComponent>;

export const Primary: Story = {
  args: {
    tabData: {} as ITab,
  },
};

export const Heading: Story = {
  args: {
    tabData: {} as ITab,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/tab works!/gi)).toBeTruthy();
  },
};
