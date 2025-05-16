import {Card} from '@/components/ui/card';
import {Outlet} from 'react-router-dom';

export const ResetPasswordLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-svh items-center justify-center p-6 bg-white">
      <div className="flex flex-col items-center justify-center w-full">
        <img
          src="/stur.svg"
          alt="logo"
          className="w-[5rem] h-[5rem] mx-auto"
        />
        <Card className="w-full lg:w-1/3 h-full p-[3.75rem] max-md:p-[1rem] rounded-2xl max-lg:h-screen">
          <Outlet />
        </Card>
      </div>
    </div>
  );
};
