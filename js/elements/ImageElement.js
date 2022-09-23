import Element from "../Element.js";

export default class ImageElement extends Element {
    constructor(cords = {}, width = 0, height = 0, z_index = 0, img_obj = null) {
        super(cords, width, height, z_index);
        this.img_obj = img_obj;
    }

    paintElement(ctx) {
        ctx.drawImage(this.img_obj, 
            this.cords.x, 
            this.cords.y,
            this.width,
            this.height);
        ctx.beginPath();
    }
}