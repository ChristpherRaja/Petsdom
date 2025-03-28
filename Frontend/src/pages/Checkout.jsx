import { lazy, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch.js';
import { apiCall } from '../utils/apiCall.js';
const AddressModel = lazy(() => import('../Features/AddressModel.jsx'));

const Checkout = ({ cartTotal }) => {

  const [addressModel, setAddressModel] = useState(false)

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { data: cartItems, error } = useFetch(['cart'], {url:'/cart'})

  const { data: user } = useFetch(['user'], {url:'/user'})

  const { mutate, isPending } = useMutation({
    mutationFn: (details) => apiCall({url:'/checkout'}, 'post', details),
    onSuccess: (data) => {
      if (data.success) {
        alert(`Payment of ${cartTotal()}$ done successfully. Your Order will be Delivered Soon`)
        navigate('/')
        queryClient.invalidateQueries({ queryKey: ['cart'] })
      }
    }
  })

  const handlePayment = async () => {
    if (!user?.data.address) {
      setAddressModel(true);
    }
    else if (confirm(`Confirm to Pay ${cartTotal()}$`)) {
      mutate({ total: cartTotal() });
    }
  }

  const header = ["Product", "Quantity", "Price"]

  return (
    <div className='container '>
      <div className="d-grid justify-self-center mt-3">
        <h3>Checkout Products</h3>
        <div className="scrollable-c1">
          <table className='checkout-table table-bordered table'>
            <thead>
              <tr>
                {header.map((header, index) => <th key={index}>{header}</th>)}
              </tr>
            </thead>
            <tbody>
              {cartItems?.data.map((item, index) => <tr key={index}>
                <td className='d-flex align-items-center gap-2'>
                  <img src={import.meta.env.VITE_BASE_URL + item.product.image} width={100} height={70} alt="" />
                  <h3>{item.product.title}</h3>
                </td>
                <td>{item.quantity}</td>
                <td>{item.subtotal}</td>
              </tr>)}

            </tbody>
          </table>
        </div>
        <div className="checkout-total d-flex mt-3 justify-content-center">
          <h3>Total:</h3>
          <h3 className='text-danger mx-2'>${cartTotal()}</h3>
        </div>
        <button onClick={handlePayment} className="btn btn-success w-50 mx-auto" >Proceed to Pay</button>
      </div>
      {addressModel && <AddressModel cartTotal={cartTotal} setAddressModel={setAddressModel} />}
    </div>
  )
}

export default Checkout