import React from 'react'
import DashCardsData from '../../components/Dashboard/dashContent/DashCardsData'
import AllUsers from '../../components/Dashboard/dashContent/AllUsers'
import BriefStatistics from '../../components/Dashboard/dashContent/BriefStatistics'

const DashHome = () => {
  return (
    <section className="w-full">
        <DashCardsData/>
        <BriefStatistics/>
        <AllUsers/>
    </section>
  )
}

export default DashHome
