import React from 'react';

const Marquee = () => {
  return (
    <div className="bg-gray-700 text-white py-2">
      <marquee behavior="scroll" direction="left">
        Please reload to update the queue
      </marquee>
    </div>
  );
};

export default Marquee;
