import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DevSiteStateSwitcher from "./DevSiteStateSwitcher";
import { SiteStateProvider } from "./SiteStateProvider";

const meta = {
  component: DevSiteStateSwitcher,
  tags: ["ai-generated"],
  decorators: [
    (Story) => (
      <SiteStateProvider siteState="D">
        <Story />
      </SiteStateProvider>
    ),
  ],
} satisfies Meta<typeof DevSiteStateSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
