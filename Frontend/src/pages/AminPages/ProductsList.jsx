import Table from '../../components/Table'
import SideBar from '../../layout/SideBar'
import useFetch from '../../hooks/useFetch'

const ProductsList = () => {

    const { data: products, error: productError } = useFetch(['products'],{url:'/products'})

    const productHead = ["Image", "Title", "Description", "Price", "Stock"]

    return (

        <div className='row m-0'>
            <SideBar />
            <Table head={productHead} data={products?.data} />
        </div>
    )
}

export default ProductsList