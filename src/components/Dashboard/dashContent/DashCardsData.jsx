import React from 'react'
import DashboardCard from '../../common/components/ui/DashboardCard'
import i18n from '../../common/components/LangConfig'

const DashCardsData = () => {
  return (
    <section className='flex flex-col'>
        <h1 className="px-7 pt-4 font-bold text-[#1C2A53] dark:text-gray-300">{i18n.t("Dashboard")}</h1>
        <div className="grid lg:grid-cols-4 gap-5 px-7 mt-5 grid-cols-4 w-full">
        <DashboardCard name={i18n.t("dashboard.cardNames.revenue")} amount={(7000).toLocaleString()} percentage={+20} unit={"CFA"}/>
        <DashboardCard name={i18n.t("dashboardNavs.products")} amount={(7000).toLocaleString()} percentage={-20} unit={"Prod."}/>
        <DashboardCard name={i18n.t("dashboardNavs.customers")} amount={(7000).toLocaleString()} percentage={10} unit={"Cust."}/>
        <DashboardCard name={i18n.t("dashboardNavs.orders")} amount={(7000).toLocaleString()} percentage={-28} unit={"Prod."}/>
        </div>
    </section>
  )
}

export default DashCardsData
