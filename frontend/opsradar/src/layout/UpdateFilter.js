import React from "react";

const UpdateFilter = ({ fieldName, inputName, fieldOptions, currentValue }) => {
  return (
    <div className="w-1/2 flex align-center">
      <span className="font-semibold mr-2">
        <label htmlFor="status">{fieldName}</label>
      </span>
      <select
        id={inputName}
        name={inputName}
        autoComplete="country-name"
        className="block w-1/2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
      >
        {fieldOptions.map((option) => (
          <option key={option} selected={option === currentValue}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UpdateFilter;
