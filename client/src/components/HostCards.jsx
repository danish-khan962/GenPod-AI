import React, { useState } from 'react';

const HostCards = ({ image, hostType }) => {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelect = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      onClick={toggleSelect}
      className={`p-3 flex flex-col gap-3 items-center justify-center rounded-xl transition-all duration-500 ease-in-out cursor-pointer ${
        isSelected ? 'bg-primary/10' : 'bg-gray_2/5 hover:bg-gray_2/10'
      }`}
    >
      <img src={image} alt="" className="h-16 w-16 rounded-full" />
      <p className="font-medium text-xs">{hostType}</p>
    </div>
  );
};

export default HostCards;
