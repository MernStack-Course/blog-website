import React, { useState } from "react";

function CustomModal({ children, title, onSubmit }) {
  const [isClose, setIsClose] = useState(false);

  return (
    <div className="w-full h-screen fixed top-0 left-0  flex items-center justify-center bg-black   z-40">
      <div className="min-w-2xl flex flex-col bg-white z-50 rounded-md px-4 py-6">
        <div>
          <span>{title}</span>
        </div>
        <div>{children}</div>
      <footer>
        <button onClick={onSubmit}>Submit</button>
      </footer>
      </div>
    </div>
  );
}

export default CustomModal;
