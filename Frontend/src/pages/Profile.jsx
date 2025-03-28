import { useMutation, useQueryClient } from '@tanstack/react-query'
import avatar from '../assets/avatar-3814081_1920.png'
import Visits from '../Features/Visits.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { apiCall } from '../utils/apiCall.js'
import useFetch from '../hooks/useFetch.js'

const Profle = () => {

  const queryClient = useQueryClient()

  const navigate = useNavigate();

  const { data: user, error: userError, refetch } = useFetch(['user'], {url:'/user'})

  const { mutate } = useMutation({
    mutationFn: () => apiCall({url:'/auth/logout'}, 'post'),
    onSuccess: () => {
      refetch()
      navigate('/');
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    }
  })

  return (
    <>
      <div className='card shadow p-3 m-2'>
        <h1 className='text-center'>Profile</h1>
        <img src={user?.data.avatar && import.meta.env.VITE_BASE_URL + user?.data.avatar || avatar} width={100} height={100} alt="" className='rounded-circle mx-auto border border-3' />
        <div className="card-body text-center">
          <p>{user?.data.name}</p>
          <p>{user?.data.email}</p>
          <button className="btn btn-primary me-1" onClick={() => navigate('/edit-profile')}>Edit Profile</button>
          <button className="btn btn-primary ms-1" onClick={() => mutate()}>Logout</button>
        </div>
        {user?.data.role=='user' && <div className="card-body list-group">
          <p><Link className='list-group-item' to={'/orders'}> Your Orders</Link></p>
          <p><Link className='list-group-item' to={'/sold-products'}>Sold Products</Link></p>
        </div>}
      </div>
      {user?.data.role == "user" && <>

        <div className='card shadow p-3 m-2'>
          <h1 className='text-center'>Visits</h1>
          {user?.data.visits == "" ? <h3 className='text-center'>You haven't vist us yet!</h3>
            : user?.data.visits.map((item, index) =>
              <Visits key={index} item={item} user={user} />)}
        </div>
      </>}
    </>
  )
}

export default Profle