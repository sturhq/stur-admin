import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  // SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
// import {Brandname} from './Brandname';
import {Icon} from '@iconify/react';
// import {Badge} from '@/components/ui/badge';
import {Link, useLocation} from 'react-router-dom';
// import SturIcon from '@/assets/images/stur.svg';
import {useMedia} from 'react-use';
import {useLogoutEndpoint} from '@/services/authentication.service';
import {useIsMobile} from '@/hooks/use-mobile';
import {Spinner} from '@/components/ui/spinner';
import {Exit} from '@/assets/svgs/Icons';

type MenuItem = {
  title: string;
  url: string;
  icon: string;
  disable: boolean;
  onClick?: (e: React.MouseEvent) => void;
};
export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const {pathname} = useLocation();
  const {toggleSidebar} = useSidebar();

  const isBelow13InchMabook = useMedia('(max-width: 1599px)');
  const isMobile = useIsMobile(); // Add this line to detect mobile
  const {mutate, isPending} = useLogoutEndpoint();

  const data = {
    navMain: [
      {
        items: [
          {
            title: 'Stores',
            url: '/stores',
            icon: 'home-solid',
            disable: false,
          },
          {
            title: 'Products',
            url: '/products',
            icon: 'cube-solid',
            disable: false,
          },
          {
            title: 'Orders',
            url: '/orders',
            icon: 'shopping-cart-solid',
            disable: false,
          },
          {
            title: 'Transactions',
            url: '/transactions',
            icon: 'chart-bar-solid',
            disable: false,
          },
        ] as MenuItem[],
      },
    ],
  };
  if (isMobile) {
    const logoutItem: MenuItem = {
      title: 'Logout',
      url: '#',
      icon: 'arrow-left-on-rectangle-solid',
      disable: false,
      onClick: e => {
        e.preventDefault();
        mutate();
      },
    };
    data.navMain[0].items.push(logoutItem);
  }
  React.useEffect(() => {
    if (isBelow13InchMabook) {
      toggleSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBelow13InchMabook]);

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* <SidebarHeader>
        
      </SidebarHeader> */}
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map(item => (
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          <SidebarGroup key={item.title} className="max-lg:mt-14">
            <SidebarGroupContent className="mt-2">
              <SidebarMenu>
                {item.items.map(item => (
                  <SidebarMenuItem key={item.title}>
                    {item.title === 'Logout' ? (
                      <SidebarMenuButton
                        asChild={false}
                        disabled={item.disable}
                        onClick={item.onClick}
                      >
                        <div className="flex items-center text-[#DF1B41]">
                          {isPending ? (
                            <Spinner
                              variant="spin"
                              size="small"
                              intent="current"
                              className="mr-2"
                            />
                          ) : (
                            <div className="flex gap-[0.75rem] font-semibold text-sm">
                              <Exit className="text-[#DF1B41]" />

                              <p className="text-[#DF1B41]">
                                {item.title}
                              </p>
                            </div>
                          )}
                        </div>
                      </SidebarMenuButton>
                    ) : (
                      // For regular link items
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                        disabled={item.disable}
                      >
                        <Link
                          to={item.url}
                          className="flex"
                          onClick={() => {
                            if (window.innerWidth <= 768) {
                              toggleSidebar();
                            }
                          }}
                        >
                          <Icon
                            icon={`heroicons:${item.icon}`}
                            width={26}
                            height={26}
                          />
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
