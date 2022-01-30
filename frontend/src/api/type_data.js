class DataFrameType{

    constructor(data, columns,  index){
    this.columns=columns;
    this.columns.map((co,i)=> {  })

    this.data=data;

    this.index=index;
    }

    /**
     * Construct a Car from a plain object
     * @param {{}} json
     * @return {Car} the newly created Car object
     */
    static from(json) {
        const t =  Object.assign(new DataFrameType(), json);
        return t;
    }

}

export default DataFrameType;