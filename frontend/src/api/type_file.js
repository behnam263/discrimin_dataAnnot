class FileType{

    constructor(name, description){
    this.name=name;
    this.description=description;
    }


    static from(json) {
        const t =  Object.assign(new filetype(), json);
        return t;
    }

}

export default FileType;