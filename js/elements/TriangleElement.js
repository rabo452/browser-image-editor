import Element from "../Element.js";

export default class TriangleElement extends Element {
    constructor(cords = {}, width = 0, height = 0, z_index = 0,
                top_point_cords = {}, left_point_cords = {}, 
                right_point_cords = {}, rgb_color = []) 
    {
        super(cords, width, height, z_index);
        this.top_point_cords = top_point_cords;
        this.left_point_cords = left_point_cords;
        this.right_point_cords = right_point_cords;
        this.rgb_color = rgb_color;
    } 

    paintElement(ctx) {
        ctx.fillStyle = `rgb(${this.rgb_color[0]}, ${this.rgb_color[1]}, ${this.rgb_color[2]})`;

        ctx.beginPath();
        ctx.moveTo(this.top_point_cords.x, this.top_point_cords.y);
        ctx.lineTo(this.right_point_cords.x, this.right_point_cords.y);
        ctx.lineTo(this.left_point_cords.x, this.left_point_cords.y);
        ctx.closePath();
        ctx.fill();
    }

    changeCords(x, y) {
        var dif_x = x - this.cords.x;
        var dif_y = y - this.cords.y;

        this.top_point_cords.x += dif_x;
        this.top_point_cords.y += dif_y;
        this.left_point_cords.x += dif_x;
        this.left_point_cords.y += dif_y;
        this.right_point_cords.x += dif_x;
        this.right_point_cords.y += dif_y;

        super.changeCords(x, y);
    }

    changeResolution(width, height) {
        super.changeResolution(width, height);

        var triangle_points = {
            top: {
                x: this.cords.x + this.width / 2,
                y: this.cords.y
            },
            right: {
                x: this.cords.x + this.width,
                y: this.cords.y + this.height
            },
            left: {
                x: this.cords.x,
                y: this.cords.y + this.height
            }
        }

        this.left_point_cords = triangle_points.left;
        this.right_point_cords = triangle_points.right;
        this.top_point_cords = triangle_points.top;
    }
}