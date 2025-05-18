import {Outlet, useNavigate} from 'react-router-dom';

import {SidebarInset, SidebarProvider} from '@/components/ui/sidebar';
import {AppSidebar} from '@/components/organisms/Sidebar/AppSidebar';
import {ScrollArea} from '@/components/ui/scroll-area';
import {ProtectedRoute} from '@/config/ProtectedRoute';
import SturIcon from '@/assets/images/stur.svg';
import {Exit} from '@/assets/svgs/Icons';
import {Spinner} from '@/components/ui/spinner';
import {useLogoutEndpoint} from '@/services/authentication.service';

export const DashboardLayout = () => {
  const navigate = useNavigate();

  const {mutate, isPending} = useLogoutEndpoint();

  return (
    <ProtectedRoute>
      <div className="fixed w-full">
        <SidebarProvider className="flex flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2 border-none px-4 bg-[#30313D] relative  justify-between">
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
