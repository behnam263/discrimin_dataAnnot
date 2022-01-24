class ml{

    constructor(id, model, name, description){
        if(id)
        this.id = id;

    this.model=model;
    this.name=name;
    this.description=description;
    }

    /**
     * Construct a Car from a plain object
     * @param {{}} json
     * @return {Car} the newly created Car object
     */
    static from(json) {
        const t =  Object.assign(new ml(), json);
        return t;
    }

}

export default ml;