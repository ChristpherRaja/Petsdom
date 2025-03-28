import SideBar from '../../layout/SideBar'
import useFetch from '../../hooks/useFetch'
import Table from '../../components/Table'

const VisitsList = () => {

  const { data:visits, isLoading, isError } = useFetch(['visits'],{url:'/visits'})

  const head = ["Date", "User", "Email", "Tickets", "Total", "Status"]

  return (
    <div className='row m-0 text-center'>
      <SideBar />
      {isLoading && <h3>Loading...</h3>}
      {isError && <h3>Something went wrong</h3>}
      <Table head={head} data={visits?.data} />
    </div>
  )
}

export default VisitsList