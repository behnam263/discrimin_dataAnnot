class MenuItemType{

    constructor(name , value,  text){
    this.name=name;
    this.value=value;
    this.text=text;
    }

    /**
     * Construct a Car from a plain object
     * @param {{}} json
     * @return {Car} the newly created Car object
     */
    static from(json) {
        const t =  Object.assign(new MenuItemType(), json);
        return t;
    }

}

export default MenuItemType;