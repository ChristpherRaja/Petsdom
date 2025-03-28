import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { apiCall } from '../../utils/apiCall'

const DeleteBtn = ({id}) => {

  const queryClient = useQueryClient()

    const {mutate:cartDeleteFn} = useMutation({
        mutationFn:(id)=>apiCall({url:`/cart/${id}`},`delete`),
        onSuccess:()=>{
          queryClient.invalidateQueries({queryKey:['cart']})
        }
      })
      
  return (
    <button onClick={() => cartDeleteFn(id)} className="btn btn-danger d-block mx-auto">Remove</button>
  )
}

export default DeleteBtn