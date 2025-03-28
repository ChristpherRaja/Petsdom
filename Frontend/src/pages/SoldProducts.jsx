import React from 'react'
import useFetch from '../hooks/useFetch'

const SoldProducts = () => {

    const {data:SoldProducts} = useFetch(['sell'],{url:'/sold-products'})

    return (
        <div className='container'>
            <div className="row my-3 g-3">
                <h1 className='text-center'>Sold Products</h1>
                {SoldProducts?.data.map(item => <div key={item._id} className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <span>Request Sent on: {item.createdAt.split("T")[0]}</span>
                        </div>
                        <table className="table table-borderless">
                            <thead><tr>
                                <th>Products</th>
                                <th>Description</th>
                                <th>Stock</th>
                                <th>Status</th>
                            </tr></thead>
                            <tbody>
                                <tr key={item._id}>
                                    <td>
                                        <img src={import.meta.env.VITE_BASE_URL + item.image} alt="" width={50} height={40} />
                                        {item.title}
                                    </td>
                                    <td>{item.description}</td>
                                    <td>{item.stock}</td>
                                    <td>{item.verificationStatus}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="card-footer">
                            <span>Price:{item.price}</span>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default SoldProducts