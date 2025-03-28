import Table from '../../components/Table'
import SideBar from '../../layout/SideBar'
import useFetch from '../../hooks/useFetch'

const UsersList = () => {

  const { data: users, error } = useFetch(['users'],{url:'/users'})

  const userHead = ["Image", "Name", "Email", "Role"]

  return (
    <div className='row m-0'>
      <SideBar />
      <Table head={userHead} data={users?.data} />
    </div>
  )
}

export default UsersList