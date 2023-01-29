class DataFrameType {
    constructor(data, columns, index) {
        this.columns = columns;
        this.columns.map((co, i) => { })
        this.data = data;
        this.index = index;
    }
    static from(json) {
        const t = Object.assign(new DataFrameType(), json);
        return t;
    }
}

export default DataFrameType;