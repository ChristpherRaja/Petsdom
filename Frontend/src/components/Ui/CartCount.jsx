import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { apiCall } from '../../utils/apiCall'

const CartCount = ({ item }) => {

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: (details) => apiCall({url:'/cart'}, 'put', details),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        }
    })

    const addCount = (id) => {
        mutate({ cartId: id, type: "increment" })
    }

    const subCount = (id) => {
        mutate({ cartId: id, type: "decrement" })
    }

    return (
        <div className='d-flex mb-2 justify-content-center'>
            <div className="col-9 border rounded d-flex align-items-center justify-content-between">
                <button onClick={() => subCount(item._id)} className="btn" disabled={item.quantity <= 1}>-</button>
                <span className="px-0">{item.quantity}</span>
                <button onClick={() => addCount(item._id)} className="btn" disabled={item.quantity >= item.product.stock}>+</button>
            </div>
        </div>
    )
}

export default CartCount