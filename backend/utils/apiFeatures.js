class APIFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
        const keyword = this.queryStr.keyword? {
            name:{
                $regex:this.queryStr.keyword,
                $options:'i',
                // i ==> not case sensitive
            }
        }:{};
        // console.log(keyword);
        // console.log(this.queryStr);
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr};
        console.log(queryCopy);

        // Removing fields from Query        
        // Filter for Category
        const removeFields  = ['keyword',"limit","page"];
        removeFields.forEach(element=>delete queryCopy[element]);

        // Filter for Price
        let queryStr = JSON.stringify(queryCopy);
        console.log(queryStr);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,match => `$${match}`)
        // Appending $ sign using regular expression
        console.log(queryStr);
        
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(resultsPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultsPerPage *(currentPage - 1);
        this.query = this.query.limit(resultsPerPage).skip(skip);
        return this;
    }

}

module.exports = APIFeatures;