import React from 'react'
import useFetch from '../hooks/useFetch'

const Orders = () => {

    const { data: order, error: orderError } = useFetch(['order'], {url:'/order'})

    return (
        <div className='container'>
            <div className="row my-3 g-3">
                <h1 className='text-center'>Orders History</h1>
                {order?.data.map(item => <div key={item._id} className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <span>Order Placed: {item.createdAt.split("T")[0]}</span>
                        </div>
                        <table className="table table-borderless">
                            <thead><tr>
                                <th>Products</th>
                                <th>Price</th>
                            </tr></thead>
                            <tbody>
                                {item.products.map(productInfo => <tr key={productInfo.product._id}>
                                    <td>
                                        <img src={import.meta.env.VITE_BASE_URL + productInfo.product.image} alt="" width={50} height={40} />
                                        {productInfo.product.title}
                                    </td>
                                    <td>{productInfo.product.price} x {productInfo.quantity}</td>
                                </tr>)}
                            </tbody>
                        </table>
                        <div className="card-footer">
                            <span>Total:{item.total}</span>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default Orders