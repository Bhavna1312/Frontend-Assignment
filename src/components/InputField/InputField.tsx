import React, { useState } from "react";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  type?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  clearable?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  helperText,
  errorMessage,
  type = "text",
  disabled = false,
  invalid = false,
  loading = false,
  clearable = false,
}) => {
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1 w-full max-w-sm">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={`w-full rounded-md border px-3 py-2 pr-10 text-sm shadow-sm focus:outline-none
            ${invalid ? "border-red-500 focus:ring-2 focus:ring-red-400" : "border-gray-300 focus:ring-2 focus:ring-blue-400"}
            ${disabled ? "bg-gray-100 cursor-not-allowed text-gray-400" : "bg-white"}
          `}
        />

        {/* Loading spinner */}
        {loading && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500"></div>
          </div>
        )}

        {/* Clear button */}
        {clearable && value && !loading && (
          <button
            type="button"
            className="absolute inset-y-0 right-3 text-gray-400 hover:text-gray-600"
            onClick={() => setValue("")}
          >
            ✕
          </button>
        )}

        {/* Password toggle */}
        {type === "password" && !loading && (
          <button
            type="button"
            className="absolute inset-y-0 right-3 text-gray-400 hover:text-gray-600 text-xs"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {/* Helper / error text */}
      {invalid && errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
      {!invalid && helperText && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  );
};

export default InputField;
