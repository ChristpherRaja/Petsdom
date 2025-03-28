import React from 'react'

const Visits = ({ item }) => {

  return (
    <div className="container">
      <div className='row border-bottom'>
        <p className='col-12 col-md-4'>Date: {item.date.split('T')[0]}</p>
        <p className='col-12 col-md-4'>Tickets: {item.ticketCount}</p>
        <p className='col-12 col-md-4'>Total Amount: {item.total}</p>
      </div>
    </div>
  )
}

export default Visits