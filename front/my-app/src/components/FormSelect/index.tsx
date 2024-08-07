import React from "react";

interface FormSelectProps {
  name: string;
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

const FormSelect: React.FC<FormSelectProps> = ({ name, value,label, onChange, options }) => {
  return (
    <div>
      <label htmlFor={name} className="block font-bold">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-md"
        title="Select an option"
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
