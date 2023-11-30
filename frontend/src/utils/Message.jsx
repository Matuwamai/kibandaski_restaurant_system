import React from "react";

const Message = ({ children }) => {
  return (
    <div
      className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-3 rounded relative'
      role='alert'
    >
      {children}
    </div>
  );
};

export default Message;
