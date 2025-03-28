import { Link, NavLink } from 'react-router-dom'

const SideBar = () => {

    const content = [
        { route: '/', icon: "bi-speedometer2", name: "DashBoard" },
        { route: '/products-list', icon: "bi-grid", name: "Products" },
        { route: '/users-list', icon: "bi-people", name: "Customers" },
        { route: '/orders-list', icon: "bi-table", name: "Orders" },
        { route: '/visits-list', icon: "bi-geo-alt", name: "Visits" },
        { route: '/sell-requests', icon: "bi-coin", name: "Sell Requests" },
        { route: '/add-product', icon: "bi-plus", name: "Add Product" },
        { route: '/profile', icon: "bi-person", name: "Profile" },
    ]

    return (
        <>
            <div className="side-bar col-auto col-lg-2 vh-100" >
                <h3 className='d-none d-sm-block p-2 text-center'>PetsdoM</h3>
                <div className="d-grid justify-content-center gap-4">
                    {content.map(item => <NavLink key={item.route} className={({isActive})=>`nav-link d-flex align-items-center gap-2 ${isActive && "active-sidebar"}`} to={item.route}>
                        <i className={`${item.icon} fs-4 ps-2`}></i>
                        <span className='d-none d-sm-inline'>{item.name}</span>
                    </NavLink>)}
                </div>
            </div>
        </>
    )
}

export default SideBar