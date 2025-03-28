import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { lazy, useState } from 'react'
import avatar from '../assets/avatar-3814081_1920.png'
const PopupModel = lazy(() => import('./PopupModel'));
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { apiCall } from '../utils/apiCall';

const Table = ({ head, data }) => {

  const [model, setModel] = useState({})
  const [modelState, setModelState] = useState(false)

  const queryClient = useQueryClient()

  const productDelete = useMutation({
    mutationFn: (id)=>apiCall({url:'/product/'+id},'DELETE'),
    onSuccess: () => {
      toast.success("Product deleted successfully")
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })

  const userDelete = useMutation({
    mutationFn:(id)=>apiCall({url:'/user/'+id},'delete'),
    onSuccess:()=>{
      toast.success("User Deleted Successfully",{autoClose:2000})
      queryClient.invalidateQueries({queryKey:['users']})
    }
  })

  const handleClick = (item) => {
    setModel(item);
    setModelState(true);
  }

  const handleModelEdit = (id, role) => {
    if (id && role == "user") {
      const deleteConfirmation = confirm('Are you sure to delete?')
      if (deleteConfirmation) {
        userDelete.mutate(id)
      }
    } else if (id && role == "admin") {
      toast.warn("Cannot delete Admin user")
    }else{
      const deleteConfirmation = confirm('Are you sure to delete?')
      if (deleteConfirmation) {
        productDelete.mutate(id)
      }
    }
    setModelState(false)
  }

  return (
    <div className='vh-100 overflow-y-scroll col col-lg-10'>
      <table className=' table table-hover'>
        <thead>
          <tr className='position-sticky top-0'>
            {head.map((item, index) => <th key={index} className=''>{item}</th>)}
          </tr>
        </thead>
        <tbody >
          {data?.map((item, index) => <tr key={index} onClick={() => handleClick(item)} >
            {head.includes("Image") && <td><img src={!(item.avatar || item.image) ? avatar : import.meta.env.VITE_BASE_URL+(item.image||item.avatar) } alt="" width={item.image ? 70 : 50} height={50} /></td>}
            {head.map((col,ind)=>{return col !== "Image" && <td key={ind}>{item[col.toLowerCase()]}</td>})}
          </tr>)}
        </tbody>
      </table>
      {modelState && <PopupModel head={head} model={model} setModelState={setModelState} handleModelEdit={handleModelEdit}/>}
      <ToastContainer/>
    </div>
  )
}

export default Table