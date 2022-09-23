import Element from "../Element.js";

export default class CircleElement extends Element {
    constructor(cords = {x: 0, y: 0}, width = 0, height = 0, 
                z_index = 0, rgb_color = [0, 0, 0], 
                radiusX = 0, radiusY = 0,
                center_pos = {x: 0, y: 0}) {
        super(cords, width, height, z_index);
        this.rgb_color = rgb_color;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.radius_pos = center_pos;
    }

    paintElement(ctx) {
        var rgb = this.rgb_color;

        ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        
        ctx.beginPath();

        ctx.ellipse(
            this.radius_pos.x,
            this.radius_pos.y,
            this.radiusX,
            this.radiusY,
            0,
            0,
            Math.PI * 2
        )
        ctx.fill();
        ctx.beginPath();
    }

    changeCords(x, y) {
        super.changeCords(x, y);
        this.radius_pos = {
            x: this.cords.x + this.width / 2,
            y: this.cords.y + this.height / 2
        }
    }

    changeResolution(width, height) {
        super.changeResolution(width, height);
        this.radiusX = this.width / 2;
        this.radiusY = this.height / 2;
        this.radius_pos = {
            x: this.cords.x + this.width / 2,
            y: this.cords.y + this.height / 2
        }
    }
}