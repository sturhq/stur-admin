import {Outlet, useNavigate} from 'react-router-dom';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {AppSidebar} from '@/components/organisms/Sidebar/AppSidebar';
import {Icon} from '@iconify/react';
import {useIsMobile} from '@/hooks/use-mobile';
import {ScrollArea} from '@/components/ui/scroll-area';
import {ProtectedRoute} from '@/config/ProtectedRoute';
import SturIcon from '@/assets/images/stur.svg';
import {useUser} from '@/hooks/useUser';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import storeIcon from '@/assets/icons/store.svg';
import {Button} from '@/components/ui/button';
import {toast} from '@/hooks/use-toast';
import {Cog, Exit} from '@/assets/svgs/Icons';
import {useEffect, useRef, useState} from 'react';
import {Spinner} from '@/components/ui/spinner';
import {useLogoutEndpoint} from '@/services/authentication.service';
import {ChevronDown} from 'lucide-react';

export const DashboardLayout = () => {
  const isMobile = useIsMobile();
  const {userData} = useUser();
  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(false);
  const {mutate, isPending} = useLogoutEndpoint();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOn(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <ProtectedRoute>
      <div className="fixed w-full">
        {/* <div className="nav-background absolute z-[-4] h-screen" /> */}

        <SidebarProvider className="flex flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2 border-none px-4 nav-background relative  justify-between">
            <div
              className="flex items-center gap-2"
              onClick={() => navigate('/')}
            >
              <img src={SturIcon} alt="Stur" className="w-15 h-15" />
            </div>

            {/* <Button onClick={toggleSidebar}>Toggle Sidebar</Button> */}
            {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
            {/* <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb> */}

            <div className="flex items-center gap-4">
              {userData?.store?.storeUrl && (
                <>
                  <a
                    href={userData?.store?.storeLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="heroicons:globe-alt-solid"
                        width={20}
                        height={20}
                        color="white"
                      />
                      <a
                        href={userData?.store?.storeUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <p className="text-white text-xs">View website</p>
                      </a>
                    </div>
                  </a>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        userData?.store?.storeUrl
                      );
                      toast({
                        description: 'Store link copied to clipboard',
                        variant: 'default',
                      });
                    }}
                    size="sm"
                    className="bg-white text-black p-[0.6rem] h-[0.3rem] rounded-sm"
                  >
                    Copy
                  </Button>
                  {isMobile && (
                    <SidebarTrigger className="-ml-1 text-white" />
                  )}
                </>
              )}

              {/*  <div>
                <Icon
                  icon="mdi:bell"
                  width={24}
                  height={24}
                  color="white"
                />
              </div> */}
              {!isMobile && userData?.store?.storeName && (
                <div
                  className="cursor-pointer"
                  onClick={() => setIsOn(!isOn)}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="w-7 h-7">
                      <AvatarImage src={userData?.store.storeLogoUrl} />
                      <AvatarFallback>
                        <img src={storeIcon} alt="Store" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white text-sm font-bold">
                        {userData?.store?.storeName}
                      </p>
                    </div>
                    <ChevronDown
                      className={`text-white ${
                        isOn ? 'rotate-180' : 'rotate-0'
                      } transition-transform duration-300`}
                      size={16}
                    />
                  </div>
                  <div
                    ref={dropdownRef}
                    className={`delay-400 absolute right-0 top-16 z-10 min-h-20 w-[149px] transform rounded-lg border border-neutral-100 border-opacity-30 bg-white shadow-md transition-all duration-300 ease-in-out py-1 ${
                      isOn
                        ? 'translate-y-0 opacity-100'
                        : '-translate-y-5 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div
                      onClick={() => navigate(`/settings`)}
                      className="flex text-[#30313D] font-semibold text-sm items-center gap-1.5 px-3 py-2.5 cursor-pointer"
                    >
                      <Cog />
                      Settings
                    </div>
                    <div
                      onClick={() => mutate()}
                      className="flex text-[#DF1B41] font-semibold text-sm items-center gap-1.5 px-3 py-2.5 cursor-pointer"
                    >
                      {isPending ? (
                        <Spinner
                          variant="spin"
                          size="medium"
                          intent="current"
                        />
                      ) : (
                        <>
                          <Exit className="text-[#DF1B41]" />
                          Logout
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </header>
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset>
              <ScrollArea className="h-[calc(100vh-4rem)]">
                <div className="px-[6.25rem] md:-[1.875rem] max-xl:px-[1rem] py-[1.3rem]">
                  <Outlet key={location.pathname} />
                </div>
              </ScrollArea>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </ProtectedRoute>
  );
};
