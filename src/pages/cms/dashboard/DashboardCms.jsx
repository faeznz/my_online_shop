import React from 'react'
import TableDashboardCmsComponent from './components/TableDashboardCms'
import NavbarCmsComponent from '../../../components/NavbarCms'

const DashboardCmsPage = () => {
  return (
    <div className='w-screen min-h-screen bg-slate-300'>
      <NavbarCmsComponent/>
      <div className='pt-12 px-8'>
      <TableDashboardCmsComponent/>
      </div>
    </div>
  )
}

export default DashboardCmsPage