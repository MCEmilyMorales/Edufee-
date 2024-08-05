import React from "react";

interface FormTextAreaProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({ name, placeholder, value, onChange, error }) => {
  return (
    <div>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-md"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default FormTextArea;
