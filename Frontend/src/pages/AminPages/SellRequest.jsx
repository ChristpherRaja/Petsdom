import { useMutation, useQueryClient } from '@tanstack/react-query'
import SideBar from '../../layout/SideBar'
import useFetch from '../../hooks/useFetch'
import { apiCall } from '../../utils/apiCall'

const SellRequest = () => {

    const queryClient = useQueryClient()

    const { data: sellRequests } = useFetch(['sell'],{url: '/sell-product'})

    const { mutate } = useMutation({
        mutationFn: (details) => apiCall({url:'/sell-product'}, 'put', details),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sell'] })
        }
    })

    return (
        <div className='row m-0'>
            <SideBar />
            <div className="col col-lg-10 vh-100 overflow-y-scroll">
                <h1 className='text-center'>Sell Requests</h1>
                {sellRequests?.data.map(item => <div key={item._id} className=''>
                    <div className="row border-bottom m-0">
                        <img src={import.meta.env.VITE_BASE_URL + item.image} className='d-block col-11 col-md-6 col-lg-5 mb-2 mx-auto' height={300} />
                        <div className="col-12 col-md-6 col-lg-7">
                            <p className=''>Product: {item.title}</p>
                            <p className=''>Description: {item.description}</p>
                            <p className=''>Seller: {item.user.name}</p>
                            <p className=''>Contact: {item.user.email}</p>
                            <p className=''>Price: {item.price}</p>
                            {item.verificationStatus == "in-process" ? <div className=" d-flex justify-content-md-center gap-3 my-3">
                                <button className=' btn btn-outline-success' onClick={() => mutate({ status: 'accept', sellRequestId: item._id })}>Accept</button>
                                <button className='btn btn-outline-danger' onClick={() => mutate({ status: 'decline', sellRequestId: item._id })}>Decline</button>
                            </div> : <p>{item.verificationStatus}</p>}
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default SellRequest