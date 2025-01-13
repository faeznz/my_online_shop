import React from 'react'
import NavbarComponent from '../../components/Navbar'
import CompanyDetailComponents from './components/CompanyDetailCOmponents'
import TeamCompanyComponent from './components/TeamCompanyComponent'
import FooterComponent from '../../components/Footer'

const CompanyPage = () => {
  return (
    <div className='w-screen min-h-screen'>
        <NavbarComponent/>
        <CompanyDetailComponents/>
        <TeamCompanyComponent/>
        <FooterComponent/>
    </div>
  )
}

export default CompanyPage