import { useState } from "react"

const FilterSidebar = ({ setSearchParams }) => {

    const [filter, setFilter] = useState({})
    const [applyBtn, setApplyBtn] = useState(false);

    const handleChange = (e,menu) => {
        const title = menu.toLowerCase()
        setApplyBtn(true);
        console.log(menu,e.target.value);
        setFilter({title,value:e.target.value.toLowerCase()})
    }

    const onApply = () => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.append(filter.title, filter.value);
            return newParams;
        })
    }

    const menus = [
        {
            id: 1, name: "Price Range", value: [
                { id: 1, label: "100-500" },
                { id: 2, label: "500-1000" },
                { id: 3, label: "1000-2000" },
                { id: 4, label: "Above 2000" }]
        },
        {
            id: 2, name: "Category", value: [
                { id: 1, label: "Mammals" },
                { id: 2, label: "Birds" },
                { id: 3, label: "Aquatic" },
                { id: 4, label: "Reptiles" }
            ]
        },
        {
            id: 3, name: "Price", value: [
                { id: 1, label: "Low-High" },
                { id: 2, label: "High-Low" }
            ]
        },
        {
            id: 4, name: "Name", value: [
                { id: 1, label: "Ascending" },
                { id: 2, label: "Descending" }
            ]
        }
    ]

    return (
        <div className='side-bar col-3 col-lg-2' style={{ height: '92vh' }}>
            <h4>Filters</h4>
            <form >
                {menus.map(menu => <div className="mb-3" key={menu.id}>
                    <label htmlFor="price">{menu.name}</label><br />
                    {menu.value.map(price => <div key={price.id}>
                        <input onChange={(e)=>handleChange(e,menu.name)} type="radio" value={price.label} name={menu.name} id={price.label} />
                        <label htmlFor={price.menu}>{price.label}</label><br />
                    </div>)}
                </div>)}
            </form>

            {applyBtn && <button onClick={onApply} className="btn btn-primary">Apply</button>}
        </div>
    )
}

export default FilterSidebar