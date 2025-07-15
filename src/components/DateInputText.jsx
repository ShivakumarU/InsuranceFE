import { useState } from 'react';
import toast from 'react-hot-toast';

const isValidDateFormat = (dateString) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  return regex.test(dateString);
};

const DateInputText = ({ label, value = '', onChange }) => {
  const [hasError, setHasError] = useState(false);

  const handleBlur = () => {
    if (value && !isValidDateFormat(value)) {
      toast.error(`Invalid date in "${label}". Use DD/MM/YYYY`);
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-gray-700">{label}</label>
      <input
        type="text"
        placeholder="DD/MM/YYYY"
        value={value}
        className={`input input-bordered w-1/3 ${hasError ? 'border-red-500' : ''}`}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default DateInputText;
