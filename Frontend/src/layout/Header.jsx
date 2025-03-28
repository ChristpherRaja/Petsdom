import logo from '../assets/PetsdoM2.png'
import { NavLink, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useState } from 'react'

const Header = () => {

  const [keyword, setKeyword] = useState('');

  const navigate = useNavigate();

  const { data: isUserLogin } = useFetch(['auth'],{url:"/auth/is-auth"})

  const { data: user, error: userError } = useFetch(['user'],{url:'/user'})

  const { data: cartItems, error: CartError } = useFetch(['cart'],{url:'/cart'})

  const handleSearch = (e)=>{
    e.preventDefault();
    navigate(`/search?keyword=${keyword}`)
  }

  return (
    <nav className='navbar d-flex align-items-center position-sticky top-0 z-1'>
      <div className="container-fluid">
        <img src={logo} alt="PetsdoM" />
        <form onSubmit={handleSearch} className="input-group w-25">
          <input type="text" placeholder='Search' value={keyword} onChange={(e) => setKeyword(e.target.value)} className="form-control" />
          <button onClick={handleSearch} className="input-group-text bi-search"></button>
        </form>
        <div className="d-flex text-light gap-3 gap-lg-5">
          <NavLink to={'/'} className={({isActive})=> `bi-house h4 ${isActive && "active"}`}></NavLink>
          {user?.data?.role !== 'admin' && <NavLink to={'/cart'} className={({isActive})=>`bi-cart position-relative h4 ${isActive && "active"}`}>
            {cartItems?.data?.length > 0 && <p className='top-0 start-100 translate-middle position-absolute bg-warning rounded-pill px-2 fs-6'>{cartItems?.data?.length}</p>}
          </NavLink>}
          {!isUserLogin?.success ? <NavLink to={'/login'} className='btn btn-primary '>Login</NavLink> : <NavLink to={'/profile'} className={({isActive})=>`bi-person h4 ${isActive && "active"}`}></NavLink>}
        </div>
      </div>
    </nav>
  )
}

export default Header