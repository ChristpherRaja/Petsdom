import { lazy } from "react";

export const Header = lazy(() => import('../layout/Header'));
export const Home = lazy(() => import('../pages/Home'));
export const AdminDashBoard = lazy(() => import('../pages/AminPages/AdminDashBoard'));
export const Cart = lazy(() => import('../pages/Cart'));
export const Profile = lazy(() => import('../pages/Profile'));
export const Checkout = lazy(() => import('../pages/Checkout'));
export const Login = lazy(() => import('../pages/Login'));
export const Register = lazy(() => import('../pages/Register'));
export const SingleProduct = lazy(() => import('../pages/SingleProduct'));
export const EditProfile = lazy(() => import('../pages/EditProfile'));
export const OrdersList = lazy(() => import('../pages/AminPages/OrdersList'));
export const VisitsList = lazy(() => import('../pages/AminPages/VisitsList'));
export const SellRequest = lazy(() => import('../pages/AminPages/SellRequest.jsx'))
export const AddProductForm = lazy(() => import('../pages/AminPages/AddProductForm.jsx'))
export const ProductsList = lazy(() => import('../pages/AminPages/ProductsList.jsx'))
export const UsersList = lazy(() => import('../pages/AminPages/UsersList.jsx'))
export const Orders = lazy(()=>import('../pages/Orders.jsx'));
export const SoldProducts = lazy(()=>import('../pages/SoldProducts.jsx'));
export const Search = lazy(()=>import('../Features/Search.jsx'));

export { default as ProtectedRoute } from '../components/ProtectedRoute';
export { default as AdminRoute } from '../components/AdminRoute';
