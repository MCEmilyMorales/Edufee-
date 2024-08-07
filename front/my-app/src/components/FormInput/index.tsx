import React from 'react';

interface FormInputProps {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

const FormInput: React.FC<FormInputProps> = ({ type, name,label, placeholder, value, onChange, error }) => (
  <div>
    <label htmlFor={name} className="block font-bold">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-300 rounded-md"
      value={value}
      onChange={onChange}
    />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

export default FormInput;
