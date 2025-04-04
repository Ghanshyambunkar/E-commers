class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    search(){
        const keyword=this.queryStr.keyword 
         ? {
             name: {
                $regex: this.queryStr.keyword,
                $options: "i",
             },
            }
         : {};

        this.query=this.query.find({...keyword});
        return this;

    }

    // filter(){
    //     const queryCopy={...this.queryStr};
    //     // console.log(queryCopy);
    //     // Removing some field for category

    //     const removefield=["keyword","page","limit"];

    //     removefield.forEach((key)=>delete queryCopy[key]);

    //     // console.log(queryCopy);

    //     this.query=this.query.find(queryCopy);
    //     return this;
    // }

    filter(){
        const queryCopy={...this.queryStr};
        // console.log(queryCopy);
        // Removing some field for price

        const removefield=["keyword","page","limit"];

        removefield.forEach((key)=>delete queryCopy[key]);

        // console.log(queryCopy);

        let queryStr=JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=> `$${key}`);

        this.query=this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page)||1;

        const skip = resultPerPage*(currentPage-1);

        this.query=this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports=ApiFeatures;