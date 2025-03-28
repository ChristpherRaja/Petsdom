import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {

  const footer = [
    { title: "Explore", list: ["Products", "Contact us", "Small pets", "Birds"] },
    { title: "QUICK LINKS", list: ["Sell your pets", "Pre book for visit", "Profile", "Orders"] }
  ]

  return (
    <div className="row mt-5">
      {footer.map((item, index) => <div key={index} className="col-12 col-lg-4">
        <h6 className=''>{item.title}</h6>
        <div className='d-flex d-lg-block gap-4 mb-5 mb-lg-0'>
          {item.list.map((list, ind) => <Link to={'/'+list.toLowerCase()} key={ind} className='nav-link'>{list}</Link>)}
        </div>
      </div>)}

      <div className="col-12 col-lg-4">
        <h6 className=''>FOLLOW US</h6>
        <div className='d-flex  gap-4 mb-4'>
          <Link className='nav-link bi-instagram'></Link>
          <Link className='nav-link bi-facebook'></Link>
          <Link className='nav-link bi-twitter'></Link>
          <Link className='nav-link bi-linkedin'></Link>
        </div>
        <h6>GET IN TOUCH</h6>
        <div className="mb-3">
          <li className='nav-link bi-telephone'> 1234567890</li>
          <li className='nav-link bi-envelope'> petsdom@gmail.com</li>
        </div>
      </div>

    </div>
  )
}

export default Footer