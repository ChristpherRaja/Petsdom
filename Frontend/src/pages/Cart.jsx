import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import DeleteBtn from "../components/Ui/DeleteBtn.jsx";
import CartCount from "../components/Ui/CartCount.jsx";
import { ToastContainer,toast } from "react-toastify";

const Cart = ({ cartTotal }) => {

  const navigate = useNavigate()

  const { data: isUserLogin, error } = useFetch(['auth'], { url: '/auth/is-auth' })

  const { data: cartItems, isLoading, error: cartError } = useFetch(['cart'], { url: '/cart' });

  const checkoutNav = () => {
    if (isUserLogin) {
      navigate('/checkout')
    } else {
      navigate('/login')
    }
  }

  if (isLoading) return <h3>Loading...</h3>

  if (error) return <h3>Something went wrong!</h3>

  return (<>
    <div className='container cart-container'>
      {cartItems?.data?.length == 0 ? <p className="text-center mt-5">Cart is empty!</p> : <div className="row g-3 my-3 ">
        {cartItems?.data?.map((item, index) => <div key={index} className="col-md-4 col-lg-3 col-6">
          <div className="card">
            <img src={import.meta.env.VITE_BASE_URL + item.product.image} className="card-img-top card-img" alt="..." height={170} />
            <div className="card-body">
              <h5 className="card-title text-truncate">{item.product.title}</h5>
              <p className="card-text text-truncate">{item.product.description}</p>
              <p className="card-text text-danger">${Math.round(item.product.price)}</p>
              <CartCount item={item} />
              <DeleteBtn id={item._id} />
            </div>
          </div>
        </div>)}
        <div className=" justify-content-between d-flex gap-2 my-3">
          <h2>Total: {cartTotal()}$</h2>
          <button onClick={checkoutNav} className="btn btn-success">Checkout</button>
        </div>
      </div>}
      <ToastContainer/>
    </div>
  </>
  )
}

export default Cart