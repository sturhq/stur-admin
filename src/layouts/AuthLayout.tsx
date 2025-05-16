import {Outlet} from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-1">
      <div className="flex flex-col col-span-1 max-[1152px]:col-span-1">
        <div className="flex flex-1 items-center justify-center bg-white">
          <div className="w-full max-w-[32rem] px-4 py-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
