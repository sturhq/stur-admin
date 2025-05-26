import React from 'react';
import SturIcon from '@/assets/images/stur.svg';
import {Exit} from '@/assets/svgs/Icons';
import {useLogoutEndpoint} from '@/services/authentication.service';
import {useNavigate} from 'react-router-dom';
import {Spinner} from '@/components/ui/spinner';

interface FullScreenLayoutProps {
  showLogout?: boolean;
  children: React.ReactNode;
}

const FullScreenLayout: React.FC<FullScreenLayoutProps> = ({
  children,
  showLogout,
}) => {
  // const {mutate} = useLogoutEndpoint();
  const navigate = useNavigate();

  const {mutate, isPending} = useLogoutEndpoint();

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 border-none px-4 bg-[#30313D] relative  justify-between">
        <div
          className="flex items-center gap-2"
          onClick={() => navigate('/')}
        >
          <img src={SturIcon} alt="Stur" className="w-15 h-15" />
        </div>

        <div>
          <button
            onClick={() => mutate()}
            className="flex items-center gap-1.5 text-white text-base font-medium"
          >
            <Exit />
            {isPending ? (
              <Spinner variant="spin" size="small" intent="current" />
            ) : (
              'Logout'
            )}
          </button>
        </div>
      </header>
      <div className="bg-offWhite min-h-svh rounded-tl-[1.5rem] rounded-tr-[1.5rem] z-10 relative">
        {children}
      </div>
    </div>
  );
};
export default FullScreenLayout;
{
  /*   <header className="flex sticky top-0 h-16 shrink-0 items-center gap-2 border-none px-4 nav-background justify-between">
        <div className="flex items-center gap-2">
          <img src={SturIcon} alt="Stur" className="w-15 h-15" />
        </div>
        {showLogout && (
          <div>
            <button
              onClick={() => mutate()}
              className="flex items-center gap-1.5 text-white text-base font-medium"
            >
              <Exit />
              Logout
            </button>
          </div>
        )}
      </header> */
}
