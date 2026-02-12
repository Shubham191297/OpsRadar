import React from "react";

const Input = ({ fieldName, inputName, errors }) => {
  return (
    <div className="text-left" key={inputName}>
      <label
        htmlFor={inputName}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {fieldName}
      </label>
      <div className="mt-2">
        <input
          id={inputName}
          name={inputName}
          type="text"
          autoComplete="text"
          required
          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 ${
            errors?.inputName === inputName
              ? "bg-red-200 ring-red-600"
              : "ring-gray-300"
          } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
        />
      </div>
    </div>
  );
};

export default Input;
