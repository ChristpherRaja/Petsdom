import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import useFetch from './hooks/useFetch.js';

import { Header, Home, AdminDashBoard,Cart, Profile, VisitsList, SellRequest, 
  Checkout, Login, Register, SingleProduct, EditProfile, OrdersList, Search,
  AddProductForm, ProductsList, UsersList, ProtectedRoute, AdminRoute, SoldProducts, Orders
 } from './utils/import.js';
import ScrollToTop from './components/ScrollToTop.jsx';

const App = () => {

  const { data: user, isLoading, error: userError } = useFetch(['user'],{url:'/user'})

  const { data: isUserLogin, error } = useFetch(['auth'],{url:'/auth/is-auth'});

  const { data: cartItems, error: cartError } = useFetch(['cart'],{url:'/cart'})

  const cartTotal = () => {
    const totalArr = cartItems?.data && cartItems?.data.map(item => item.subtotal);
    const total = totalArr?.reduce((acc, cur) => acc + cur, 0);
    return total
  }

  if(isLoading) return <h1>Loading...</h1>
  
  if(userError) return <h1>Something went wrong!</h1>

  return (<>
    <BrowserRouter>
    <ScrollToTop />
      {user?.data?.role!="admin" && <Header/>}
      <Routes>
        <Route path='/' element={user?.data?.role == 'admin' ? <AdminDashBoard /> : <Home />} />
        <Route path='/cart' element={<Cart cartTotal={cartTotal} />} />
        <Route path='/search' element={<Search/>} />
        <Route path='/singleProduct' element={<SingleProduct />} />

        <Route path='/login' element={isUserLogin?.success ? <Navigate to={'/'} replace/> : <Login />} />
        <Route path='/register' element={isUserLogin?.success ? <Navigate to={'/'} /> : <Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/checkout' element={<Checkout cartTotal={cartTotal} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/sold-products' element={<SoldProducts />} />
          <Route path='/edit-profile' element={<EditProfile />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path='/orders-list' element={<OrdersList />} />
          <Route path='/visits-list' element={<VisitsList />} />
          <Route path='/products-list' element={<ProductsList />} />
          <Route path='/users-list' element={<UsersList />} />
          <Route path='/add-product' element={<AddProductForm />} />
          <Route path='/sell-requests' element={<SellRequest />} />
        </Route>

        {/* /* handling wrong route */}
        <Route path='*' element={<Navigate to={'/'} />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App