import type { Meta, StoryObj } from "@storybook/react";
import InputField from "./InputField"; // adjust path if needed

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"], // optional but recommended
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Name",
    placeholder: "Enter your name",
    helperText: "This is a helper text",
  },
};

export const Error: Story = {
  args: {
    label: "Email",
    invalid: true,
    errorMessage: "Invalid email address",
  },
};