import React from 'react';
import image404 from '@/assets/images/404.svg';
import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white gap-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Oops!</h1>
        <p className="text-lg">Page not found</p>
      </div>
      <img src={image404} alt="404" />
      <Button onClick={() => navigate('/')}>Back to home</Button>
    </div>
  );
};

export default Page404;
