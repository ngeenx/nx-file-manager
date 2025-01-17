import type { Meta, StoryObj } from '@storybook/angular';
import { NxFileInfoBarComponent } from './info-bar.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<NxFileInfoBarComponent> = {
  component: NxFileInfoBarComponent,
  title: 'NxFileInfoBarComponent',
};
export default meta;
type Story = StoryObj<NxFileInfoBarComponent>;

export const Primary: Story = {
  args: {
    files: [],
  },
};

export const Heading: Story = {
  args: {
    files: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/info-bar works!/gi)).toBeTruthy();
  },
};
