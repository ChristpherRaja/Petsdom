import React, { lazy, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch.js'
const SideBar = lazy(() => import('../../layout/SideBar'))


const AdminDashBoard = () => {

  const navigate = useNavigate()

  const { data: analytics } = useFetch(['analytics'], {url:'/analytics'})

  const head = [
    { name: 'Products', icon: 'bi-gift', bg: 'bg-dark' },
    { name: 'Customers', icon: 'bi-people', bg: 'bg-success' },
    { name: 'Revenue', icon: 'bi-coin', bg: 'bg-warning' },
    { name: 'Orders', icon: 'bi-cart3', bg: 'bg-danger' },
    { name: 'Visits', icon: 'bi-geo-alt', bg: 'bg-primary' }]

  return (
    <div className='row m-0'>
      <SideBar />
      <div className="col col-lg-10 p-3">

        <div className="row g-3">
          {head.map(item => <div key={item.name} className='col-12 col-md-6 col-lg-4'>
            <div className={`card flex-row justify-content-around align-items-center p-3 text-light ${item.bg}`}>
              <div >
                <h6>Total {item.name}</h6>
                <h1 className="text-center">{analytics?.data[item.name.toLowerCase()]}</h1>
              </div>
              <i className={`${item.icon} h1`}></i>
            </div>
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default AdminDashBoard