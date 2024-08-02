import React from "react";

interface FormInputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({ type, name, placeholder, value, onChange, error }) => (
  <div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-md"
    />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

export default FormInput;
