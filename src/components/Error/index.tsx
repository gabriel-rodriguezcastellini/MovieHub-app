import React from "react";

const Error: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-red-500">
          Oops! Something went wrong.
        </h2>
        <p className="text-gray-500">{message}</p>
      </div>
    </div>
  );
};

export default Error;
