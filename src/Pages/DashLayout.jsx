import React from 'react'
import SideNavbar from '../components/Dashboard/SideNavBar'
import DashboardNav from '../components/Dashboard/DashTopNav'
import { Outlet } from 'react-router-dom'

const DashLayout = () => {
  return (
    <main className='flex'>
      <div className="w-full flex-none md:w-44 shadow">
        <SideNavbar />
      </div>
      <div className="min-h-screen w-full flex flex-col items-center">
        <DashboardNav/>
        <Outlet/>
      </div>
    </main>
  )
}

export default DashLayout
