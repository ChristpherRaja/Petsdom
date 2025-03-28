import { useNavigate } from 'react-router-dom';
import useFetch from './useFetch';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiCall } from '../utils/apiCall';
import { toast } from 'react-toastify';

const useAddCart = () => {

    const queryClient = useQueryClient()

    const navigate = useNavigate()

    const { data: isUserLogin, error } = useFetch(['auth'], {url:'/auth/is-auth'})

    const { data: cartItems, error: cartError } = useFetch(['cart'], {url:'/cart'})

    const { mutate } = useMutation({
        mutationFn: (details) => apiCall({url:'/cart'}, 'post', details),
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries({ queryKey: ['cart'] })
            } else {
                console.log(data.message)
            }
        },
        onError: (err) => {
            console.log(err.message)
        }
    })

    const { mutate: putMutate } = useMutation({
        mutationFn: (details) => apiCall({url:'/cart'}, 'put', details),
        onSuccess: (data) => {
            if (data.success) {
                if (data.success) {
                    queryClient.invalidateQueries({ queryKey: ['cart'] })
                    toast.info("Item already in Cart",{autoClose:2000});
                }
            } else {
                console.log(data.message)
            }
        },
        onError: (err) => {
            console.log(err.message)
        }
    })

    const addToCart = async (id) => {
        if (isUserLogin?.success) {
            const updateCart = cartItems?.data?.find(item => item.product._id == id);
            if (!updateCart) {
                mutate({ productId: id })
            } else {
                putMutate({ cartId: updateCart._id, type: 'increment' })
            }
        } else {
            toast.info("Login to Add Products to Cart",{autoClose:1000});
            setTimeout(() => {
                navigate('/login');
            }, 2000)
        }
    }
    return addToCart
}

export default useAddCart