import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DevThemeSwitcher from "./DevThemeSwitcher";

const meta = {
  component: DevThemeSwitcher,
  tags: ["ai-generated"],
} satisfies Meta<typeof DevThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
