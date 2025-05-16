import React from 'react';
import Logo from '@/assets/images/stur.svg';

const LoaderScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen nav-background">
      <img src={Logo} alt="Stur" className="w-20 h-20 animate-pulse" />
    </div>
  );
};

export default LoaderScreen;
