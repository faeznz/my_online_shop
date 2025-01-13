import React from 'react'
import NavbarCmsComponent from '../../../components/NavbarCms'
import TableFAQCmsComponents from './components/TableFAQCms'

const FAQCmsPage = () => {
  return (
    <div className='w-screen min-h-screen bg-slate-300'>
      <NavbarCmsComponent />
      <div className='pt-12 px-8'>
        <TableFAQCmsComponents />
      </div>
    </div>
  )
}

export default FAQCmsPage