import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "./DataTable";

// Example data type
interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

// Example data
const sampleData: User[] = [
  { id: 1, name: "Alice", age: 24, email: "alice@example.com" },
  { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
  { id: 3, name: "Charlie", age: 28, email: "charlie@example.com" },
];

// Example columns
const columns = [
  { key: "name", title: "Name", dataIndex: "name" as const, sortable: true },
  { key: "age", title: "Age", dataIndex: "age" as const, sortable: true },
  { key: "email", title: "Email", dataIndex: "email" as const },
];

// --- Meta config ---
const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;

// --- Stories ---
export const Default: Story = {
  args: {
    data: sampleData,
    columns,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
  },
};

export const Selectable: Story = {
  args: {
    data: sampleData,
    columns,
    selectable: true,
  },
};