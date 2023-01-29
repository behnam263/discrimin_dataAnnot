class MenuItemType {
    constructor(name, value, text) {
        this.name = name;
        this.value = value;
        this.text = text;
    }
    static from(json) {
        const t = Object.assign(new MenuItemType(), json);
        return t;
    }
}

export default MenuItemType;