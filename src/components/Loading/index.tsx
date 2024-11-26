import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500 mb-4 mx-auto"></div>
        <h2 className="text-2xl font-semibold">Loading...</h2>
      </div>
    </div>
  );
};

export default Loading;
