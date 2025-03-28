import useFetch from '../hooks/useFetch'
import ProductCard from '../Features/ProductCard'
import { useSearchParams } from 'react-router-dom'

const Search = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const keyword = searchParams.get('keyword')
  const category = searchParams.get('category')

  const { data, isLoading, error } = useFetch(['search', keyword, category], { url: `/products`, params: { keyword, category } })

  const handleFilter = (value) => {
    setSearchParams({ keyword, category: value.toLowerCase() })
  }

  const categories = [
    { id: 1, name: "Mammals" },
    { id: 2, name: "Birds" },
    { id: 3, name: "Aquatic" },
    { id: 4, name: "Reptiles" },
    { id:5, name:'amphibians'},
    { id:6, name:'invertebrates'}
  ];

  if(isLoading) return <h1>Loading..!</h1>

  if(error) <h1>Error</h1>

  return (
    <>
      {data?.data.length > 0 ?
        <div className='row m-0'>
          <div className="d-flex justify-content-around mt-4">
            {categories.map(category=><button key={category.id} className="btn btn-primary" onClick={()=>handleFilter(category.name)}>{category.name}</button>)}
          </div>
          <div className="col row g-3 m-0 overflow-y-scroll" style={{ height: '92vh' }}>
            <ProductCard data={data} />
          </div>
        </div>
        : <p className='text-center mt-5'>Sorry no results!</p>}
    </>
  )
}

export default Search