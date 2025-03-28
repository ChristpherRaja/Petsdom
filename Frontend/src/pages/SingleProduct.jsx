import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import useAddCart from '../hooks/useAddCart'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { toast, ToastContainer } from 'react-toastify';
import { apiCall } from '../utils/apiCall.js';
import useFetch from '../hooks/useFetch.js';
import Suggestion from '../Features/Suggestion.jsx';

const SingleProduct = () => {


    const id = localStorage.getItem('singleProduct')

    const { data: product, error } = useSuspenseQuery({
        queryKey: ['product', { id }],
        queryFn: () => apiCall({ url: '/product/' + id })
    })

    const { data: user, userError } = useFetch(['user'], { url: '/user' })

    const schema = yup.object().shape({
        review: yup.string().min(10).max(500).required()
    })

    const { handleSubmit, register, setError, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: (details) => apiCall({ url: '/review' }, 'post', details),
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message, { autoClose: 2000 })
                queryClient.invalidateQueries({ queryKey: ['product'] })
            } else {
                setError('root', { message: data.message })
            }
            reset()
        }
    })

    const { mutate: deleteReviewMutate } = useMutation({
        mutationFn: (details) => apiCall({ url: '/review/' + details.id }, 'post', details),
        onSuccess: (data) => {
            if (data.success) {
                toast.success("Review Deleted successfully", { autoClose: 2000 })
                queryClient.invalidateQueries({ queryKey: ['product'] })
            }
        }
    })

    const addToCart = useAddCart()

    const addReview = ({ review }) => {
        if (!user?.data) {
            toast.error("Login to add review", { autoClose: 2000 });
        }
        mutate({ productId: product?.data?._id, review })
    }

    const handleReviewDelete = (id) => {
        deleteReviewMutate({ id, productId: product?.data?._id })
    }

    return (
        <div className='container my-4'>
            <div className="row ">
                <img src={import.meta.env.VITE_BASE_URL + product?.data?.image} alt="" className="col-12 col-md-6 " height={350} />
                <div className="col-12 col-md-6 my-2">
                    <h5>{product?.data?.title}</h5>
                    <p>{product?.data?.description}</p>
                    <h3 className='text-danger'>{product?.data?.price}$</h3>
                    <p>Stock: {product?.data?.stock}</p>
                    <button className="btn btn-warning" onClick={() => addToCart(product?.data?._id)}>Add to cart</button>

                    <div className="border rounded text-start p-3 my-3 overflow-y-scroll vh-25">
                        <h3>Reviews</h3>
                        <form className="d-flex gap-2" onSubmit={handleSubmit(addReview)}>
                            <input type="text" {...register('review')} className="form-control" placeholder='Write review' />
                            <button className="btn btn-primary">Add</button>
                        </form>
                        <p className='text-danger'>{errors.review?.message}{errors.root?.message}</p>
                        {!product?.data?.reviews[0] ?
                            <p className='text-center mt-4'>No reviews for this product!</p> :
                            product?.data?.reviews.map((item, index) => {
                                return <div className='mt-2 border-bottom' key={index}>
                                    <div className="d-flex justify-content-between">
                                        <p  >{user?.data?._id == item.user._id ? "You" : item.user.name}: </p>
                                        {user?.data?._id == item.user._id && <i className="bi-trash text-danger" onClick={() => handleReviewDelete(item._id)}></i>}
                                    </div>
                                    <p className='ms-5'>{item.review}</p>
                                </div>
                            })}
                    </div>
                </div>
                <Suggestion category={product?.data.category} productId={product?.data._id}/>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SingleProduct