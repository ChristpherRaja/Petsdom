import useFetch from '../hooks/useFetch';
import ProductCard from './ProductCard'
const Suggestion = ({ category, productId }) => {

    const { data: suggestions, isLoading, isError } = useFetch(['suggestions'], { url: '/product-suggestion', params: { category,productId } });

    if (isLoading) <h1>Loading...</h1>
    if (isError) <h1>Error</h1>

    return (
        <div className='imgs'>
            <h1>Suggestions</h1>
            <div className="row m-0">
                <ProductCard data={suggestions} />
            </div>
        </div>
    )
}

export default Suggestion