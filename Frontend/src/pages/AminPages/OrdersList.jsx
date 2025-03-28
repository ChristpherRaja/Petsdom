import SideBar from '../../layout/SideBar'
import useFetch from '../../hooks/useFetch'
import Table from '../../components/Table'

const OrdersList = () => {

  const { data: orders, isLoading, isError } = useFetch(['orders'], { url: '/orders' })

  const head = ["Date", "User", "Email", "Items", "Amount"]

  return (
    <div className='row m-0'>
      <SideBar />
      {isLoading && <h3>Loading...</h3>}
      {isError && <h3>Something went wrong</h3>}
      <Table head={head} data={orders?.data} />

    </div>
  )
}

export default OrdersList