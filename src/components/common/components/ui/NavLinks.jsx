import { MdMenuBook, MdOutlineQueryStats, MdSupportAgent } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { BsBuildings } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { GrDeliver } from "react-icons/gr";
import getUserInfo from "../../../../lib/userInfo";
import { FaBoxOpen } from "react-icons/fa";
import i18n from "../LangConfig";

const allLinks = [
  { name: i18n.t("dashboardNavs.home"), href: '/dashboard', icon: MdDashboard },
  {
    name: 'Managers',
    href: '/dashboard/managers',
    icon: MdSupportAgent,
  },
  { name: i18n.t("dashboardNavs.customers"), href: '/dashboard/customers', icon: IoIosPeople },
  { name: i18n.t("dashboardNavs.products"), href: '/dashboard/products', icon: FaBoxOpen },
  { name: i18n.t("dashboardNavs.orders"), href: '/dashboard/orders', icon: GrDeliver },
  { name: i18n.t("dashboardNavs.sales"), href: '/dashboard/sales', icon: MdMenuBook },
  { name: i18n.t("dashboardNavs.statistics"), href: '/dashboard/statistics', icon: MdOutlineQueryStats },
];

export default function NavLinks() {
    const user=getUserInfo()
    const userRole=user.data.role
  const location = useLocation();


  if (!user) {
    return <p>Please log in to access your dashboard.</p>;
  }

  const filteredLinks = userRole === 'manager'
    ? allLinks.filter(link => ['Products', 'Orders',"Sales"].includes(link.name))
    : allLinks;

  return (
    <>
      {filteredLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            to={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:bg-orange-100 hover:text-gray-700 dark:text-gray-300 text-gray-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-orange-100 text-primary dark:text-gray-700': location.pathname === link.href,
              }
            )}
          >
            <LinkIcon className='w-8' />
            <p className='hidden md:block'>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
