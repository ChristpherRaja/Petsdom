import React, { useState, lazy } from 'react'
const Carousel = lazy(() => import('../components/Carousel'));
import Footer from '../layout/Footer'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import useFetch from '../hooks/useFetch';
import ProductCard from '../Features/ProductCard';
import { useNavigate } from 'react-router-dom';
const BookingModel = lazy(() => import('../Features/BookingModel'))
const SellProductForm = lazy(() => import('../Features/SellProductModel'))

const Home = () => {

  const { data: products } = useFetch(['products'],{url:'/products'})
  
  const { data: isUserLogin } = useFetch(['auth'],{url:'/auth/is-auth'})

  const [bookingModel, setBookingModel] = useState(false)
  const [sellModel, setSellModel] = useState(false)

  const navigate = useNavigate()

  const handleClick = (type) => {
    if (type === "booking") {
      if (isUserLogin?.success) {
        setBookingModel(true)
      } else {
        toast.info("Login to Book a Visit",{autoClose:1000});
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      }
    } else {
      if (isUserLogin?.success) {
        setSellModel(true)
      } else {
        toast.info("Login to Sell Products",{autoClose:1000});
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      }
    }
  }

  return (
    <>
      <Carousel />
      <div className="container mt-3">
        <div className="card w-100 px-2 py-3 my-3 home-card text-center">
          <p className='h3'>Flat 10% off on Your first order</p>
        </div>
        <div className="d-flex justify-content-between">
          <button className='btn btn-primary' onClick={() => handleClick("booking")}>Pre book for Visit</button>
          <button className='btn btn-primary' onClick={() => handleClick("selling")}>Sell your pets to us</button>
        </div>
        {bookingModel &&  <BookingModel setBookingModel={setBookingModel} toast={toast} />}
        {sellModel && <SellProductForm setSellModel={setSellModel} toast={toast} />}
        <div className="row g-3">
          <ProductCard data={products} />
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </>
  )
}

export default Home