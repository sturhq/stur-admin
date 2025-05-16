import {
  Cart,
  Globe,
  Location,
  People,
  StoreFront,
  User,
} from '@/assets/svgs/Icons';
import {Link} from 'react-router-dom';

const routes = [
  {
    icon: <User />,
    title: 'My Profile',
    description:
      'Users information like email address, phone numbers and password settings',
    linkText: 'Profile settings',
    link: '/settings/my-profile',
  },
  {
    icon: <StoreFront />,
    title: 'Store Information',
    description:
      'Basic details, Location details, Social links and Extra info',
    linkText: 'Manage details',
    link: '/settings/store-information',
  },
  {
    icon: <Location />,
    title: 'Delivery Areas',
    description: 'Set areas you deliver to with corresponding fees',
    linkText: 'Manage delivery areas',
    link: '/settings/delivery-areas',
  },
  {
    icon: <Cart />,
    title: 'Checkout Options',
    description:
      'Configure Whatsapp numbers, Instagram, Delivery & Pickup',
    linkText: 'Manage checkout',
    link: '/settings/checkout-options',
  },
  {
    icon: <Globe />,
    title: 'Store configurations',
    description:
      'Custom color, Opening & closing hours, View modes and Currencies',
  },
  {
    icon: <People />,
    title: 'Store Managers',
    description: 'Give other people access to manage your store',
  },
];

export const SettingsRoute = () => {
  return (
    <div className="w-full grid grid-cols-12 gap-7 flex-wrap max-md:pb-5">
      {routes.map(({title, description, linkText, link, icon}, i) => {
        return (
          <Link
            key={i}
            to={link}
            className="max-md:col-span-12 col-span-6 min-[1200px]:col-span-4 border border-[#EBEEF1] p-4 rounded-[15px] flex items-start gap-4"
          >
            <span>{icon}</span>
            <div>
              <p className="font-bold text-sm text-[#30313D]">{title}</p>
              <p className="mt-1 mb-2.5 text-[#6A7383] text-sm">
                {description}
              </p>
              {linkText ? (
                <div className="text-sm text-[#5433EB] font-semibold hover:text-[#1d46ed]">
                  {linkText}
                </div>
              ) : (
                <div className="bg-[#EBEEF1] border border-[#D5DBE1] max-w-24 flex items-center justify-center text-xs rounded-sm text-[#6A7383] font-semibold mt-2.5 h-5">
                  Coming soon
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
