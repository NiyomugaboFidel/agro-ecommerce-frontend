'use client';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import customAxios from '../../lib/customAxios';
import i18n from '../common/components/LangConfig';
import ThemeSwitcher from '../Header/ThemeSwitcher';
import ChangeLang from '../TopHeader/ChangeLang';

const DashboardNav = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [formattedDate, setFormattedDate] = useState('');

  // Arrays for days and months
  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
  ];

  const monthsOfYear = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
  ];

  // Function to format the current date
  const getFormattedDate = () => {
    const date = new Date();
    const dayName = i18n.t(`dashTopNav.daysOfWeek.${date.getDay()}`);
    const day = date.getDate();
    const month = i18n.t(`dashTopNav.monthsOfYear.${date.getDay()}`);
    const year = date.getFullYear();
    return `${i18n.t(`dashTopNav.todayIs`)} ${dayName} ${day} ${month} ${year}`;
  };

  useEffect(() => {
    setFormattedDate(getFormattedDate()); // Set the initial date when the component mounts

    const token = localStorage.getItem("token");
    if (!token) return; // If no token is found, stop execution

    const fetchUserData = async () => {
      try {
        const response = await customAxios.get("/users/me");
        const data = response.data;
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    const intervalId = setInterval(() => {
      setFormattedDate(getFormattedDate());
    }, 1000 * 60);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='dark:bg-darkTheme dark:text-gray-300 z-20 w-full h-[80px] border-b border-gray-500 dark:border-gray-700 flex justify-between items-center px-6 sticky top-0 bg-white'>
      <div>
        <h1 className='font-bold text-base text-gray-700 dark:text-gray-100 capitalize font-amiri'>
          {user ? (
            <>
              {i18n.t("dashboardNavs.topNav.hello")}, <i className='font-normal'>{user.firstname} {user.lastname}</i>!
            </>
          ) : (
            `${i18n.t("dashTopNav.hello")}`
          )}
        </h1>
        <span className='text-gray-500 dark:text-gray-300 text-[12px] capitalize'>
          {formattedDate}
        </span>
      </div>

      {user && (
        <div className='absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0'>
          <div className="flex items-center gap-1">
          <ChangeLang/>
          <ThemeSwitcher/>
          </div>
          <Link to='/messages' className='relative group ml-2'>
            <button
              type='button'
              className='relative rounded-full bg-gray-800 dark:bg-white/20 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
            >
              <span className='absolute -inset-1.5'></span>
              <span className='sr-only'>View notifications</span>
              <svg
                className='h-6 w-6 stroke-gray-500 dark:stroke-gray-300'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
                />
              </svg>
            </button>
          </Link>

          {/* Profile dropdown button */}
          <div className='relative ml-3'>
            <div>
              <button
                type='button'
                className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                id='user-menu-button'
                aria-expanded={isProfileMenuOpen}
                aria-haspopup='true'
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              >
                <span className='absolute -inset-1.5'></span>
                <span className='sr-only'>Open user menu</span>
                <img
                  className='h-8 w-8 rounded-full'
                  src={user.profilePic}
                  alt={`${user.firstname} profile`}
                  width={40}
                  height={40}
                />
              </button>
            </div>

            {/* Profile dropdown */}
            {isProfileMenuOpen && (
              <div
                id='user-menu'
                className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='user-menu-button'
                tabIndex='-1'
              >
                <Link
                  to='/profile'
                  className='block px-4 py-2 text-sm text-gray-700'
                  role='menuitem'
                  tabIndex='-1'
                  id='user-menu-item-0'
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  Your Profile
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardNav;
