import useAddCart from '../hooks/useAddCart'
import { Link } from 'react-router-dom'

const ProductList = ({data}) => {

    const addToCart = useAddCart()

    const handleClick = (id) => {
        window.localStorage.setItem('singleProduct', id)
    }

    return (
            <>
                {data?.data.map(item => <div key={item._id} className=" col-6 col-lg-3 col-md-4 mt-4">
                    <div className="card ">
                        <img src={import.meta.env.VITE_BASE_URL+item.image} alt="" className="card-image-top rounded" height={170} />
                        <div className="card-body">
                            <h5 className='text-truncate'>{item.title}</h5>
                            <p className='text-truncate mb-0'>{item.description}</p>
                            <p><Link className='text-decoration-none' to={'/singleProduct'} onClick={() => handleClick(item._id)}>read more...</Link></p>
                            <p >Price: <span className="text-danger">{item.price} $</span></p>
                            <button className="btn btn-warning mx-auto d-block" onClick={() => addToCart(item._id)}>Add to Cart</button>
                        </div>
                    </div>
                </div>)}
            </>
    )
}

export default ProductList