import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "./DataTable";

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],   // <-- fixes Storybook context issue
};

export default meta;

type Story = StoryObj<typeof DataTable>;

export const Basic: Story = {
  args: {
    columns: [
      { key: "name", title: "Name" },
      { key: "age", title: "Age" },
      { key: "email", title: "Email" },
    ],
    data: [
      { name: "Bhavna", age: 22, email: "bhavna@example.com" },
      { name: "Raj", age: 25, email: "raj@example.com" },
    ],
  },
};
