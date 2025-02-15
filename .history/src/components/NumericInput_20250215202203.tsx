import { ChangeEvent, FocusEvent } from 'react';

interface NumericInputProps {
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
  defaultValue?: string | number;
  allowDecimal?: boolean;
}

export default function NumericInput({
  value,
  onChange,
  placeholder = "0",
  className = "w-32 p-2 border rounded text-center",
  defaultValue = "0",
  allowDecimal = false,
}: NumericInputProps) {
  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === defaultValue.toString()) {
      onChange('');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      onChange(defaultValue);
      return;
    }

    // Validate input based on type
    const regex = allowDecimal ? /^-?\d*\.?\d*$/ : /^-?\d*$/;
    if (regex.test(value)) {
      onChange(value);
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      className={className}
      placeholder={placeholder}
    />
  );
} 