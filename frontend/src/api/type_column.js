class ColumnType{

    constructor(field , headerName , width  ){
    this.field=field;
    this.headerName=headerName;

    this.width=width;
    }

    /**
     * Construct a Car from a plain object
     * @param {{}} json
     * @return {Car} the newly created Car object
     */
    static from(json) {
        const t =  Object.assign(new ColumnType(), json);
        return t;
    }

}

export default ColumnType;