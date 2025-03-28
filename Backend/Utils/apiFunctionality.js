class apiFunctionality {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const keyword = this.queryString.keyword ? {
            title: {
                $regex: this.queryString.keyword,
                $options: "i"
            }
        } : {};
        this.query = this.query.find({ ...keyword });
        return this
    }

    filter(){
        const queryCopy = {...this.queryString};
        const queryToRemove = ['keyword','limit','page']
        queryToRemove.forEach(el=>delete queryCopy[el])
        this.query = this.query.find(queryCopy)
        return this
    }
}

export default apiFunctionality