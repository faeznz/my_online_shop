import React from 'react'
import TableProductCmsComponent from './components/TableProductCms'
import NavbarCmsComponent from '../../../components/NavbarCms'

const ProductsCmsPage = () => {
  return (
    <div className='w-screen min-h-screen bg-slate-300'>
      <NavbarCmsComponent />
      <div className='pt-12 px-8'>
        <TableProductCmsComponent />
      </div>
    </div>
  )
}

export default ProductsCmsPage