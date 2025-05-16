import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface BrandnameProps {
  brandname: string;
}

export const Brandname = ({brandname}: BrandnameProps) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem></SidebarMenuItem>
      <SidebarMenuButton>
        <p className="text-sm">{brandname}</p>
      </SidebarMenuButton>
    </SidebarMenu>
  );
};
