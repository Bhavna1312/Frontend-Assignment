import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "./DataTable";

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
};
export default meta;

type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  args: {
    columns: [
      { header: "Name", accessor: "name" },
      { header: "Age", accessor: "age" },
      { header: "Email", accessor: "email" },
    ],
    data: [
      { name: "John Doe", age: 28, email: "john@example.com" },
      { name: "Jane Smith", age: 34, email: "jane@example.com" },
      { name: "Sam Green", age: 45, email: "sam@example.com" },
    ],
  },
};
