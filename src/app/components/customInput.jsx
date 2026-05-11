import { useState } from 'react';

interface CustomInputProps {
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  icon: React.ReactNode;
}

const CustomInput = ({ type, id, name, value, onChange, placeholder, required, icon }: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setHasValue(e.target.value.length > 0);
  };

  // Split placeholder to separate text and asterisk
  const placeholderText = placeholder.replace(' *', '');
  const hasAsterisk = placeholder.includes('*');

  return (
    <div className="relative w-full">
      <div className="relative items-center flex w-full">
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300 z-10">
          {icon}
        </div>
        
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="floating-textarea rounded-lg !bg-primary !text-white !border-white pl-10 w-full"
          placeholder="" // We'll handle placeholder with label
          required={required}
        />
        
        {/* Custom placeholder with red asterisk */}
        {!hasValue && !isFocused && (
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-300">
            <span>{placeholderText}</span>
            {hasAsterisk && <span className="text-red-500 ml-1">*</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomInput;