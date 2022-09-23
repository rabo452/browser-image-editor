import Element from "../Element.js";

export default class RectElement extends Element {
    constructor(cords = {x: 0, y: 0}, width = 0, height = 0, z_index = 0, rgb_color = [0, 0, 0]) {
        super(cords, width, height, z_index);
        this.rgb_color = rgb_color;
    }
     
    paintElement(ctx) {
        var rgb = this.rgb_color;
        ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

        ctx.beginPath();
        ctx.rect(
            this.cords.x,
            this.cords.y,
            this.width,
            this.height
        );
        ctx.fill();
        ctx.beginPath();
    }
}