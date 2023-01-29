class ColumnType {

    constructor(field, headerName, width, renderHeader) {
        this.field = field;
        this.headerName = headerName;
        this.renderHeader = renderHeader;
        this.width = width;
    }

    static from(json) {
        const t = Object.assign(new ColumnType(), json);
        return t;
    }

}

export default ColumnType;