// base element of rendering in canvas
export default class Element {
    // left corner of element cords
    cords = null;
    width = null;
    height = null;
    // can be selected by user or not
    is_selectable = true;

    constructor(cords = {x: 0, y: 0}, width = 0, height = 0, z_index = 0) {
        this.cords = cords;
        this.width = width;
        this.height = height;
        this.z_index = z_index;
    } 
    
    paintElement(ctx) {}

    // sometimes need additional functionality for changing this props
    changeCords(x, y) {
        this.cords.x = x;
        this.cords.y = y;
    }

    changeResolution(width, height) {
        this.width = width;
        this.height = height;
    }
}