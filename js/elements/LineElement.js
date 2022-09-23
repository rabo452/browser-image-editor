import Element from "../Element.js";
import PointElement from "./PointElement.js";

export default class LineElement extends Element {
    #points = [];
    
    constructor(cords = {}, width = 0, height = 0, z_index = 0, lineWidth = 0, rgb_color = []) {
        super(cords, width, height, z_index);
        this.lineWidth = lineWidth;
        this.rgb_color = rgb_color
    }

    addPoint(point) {
        if (!(point instanceof PointElement)) {
            throw new Error("point should be the class PointElement!");
        }

        this.#points.push(point);
    }

    // get the cords by points
    // get the width and height
    setProps() {
        var max_x = null;
        var min_x = null;
        var min_y = null;
        var max_y = null;

        for (var point of this.#points) {
            if (point.cords.x > max_x || !max_x) {
                max_x = point.cords.x;
            }
            if (point.cords.x < min_x || !min_x) {
                min_x = point.cords.x;
            }
            if (point.cords.y < min_y || !min_y) {
                min_y = point.cords.y;
            }
            if (point.cords.y > max_y || !max_y) {
                max_y = point.cords.y;
            }
        }

        if (!this.#points) return;

        this.width = Math.abs(max_x - min_x);
        this.height = Math.abs(max_y - min_y);
        this.cords = {
            x: min_x,
            y: min_y
        }
    }

    paintElement(ctx) {
        for (var point of this.#points) {
            point.paintElement(ctx, this.lineWidth, this.rgb_color);
        }

        ctx.beginPath();
    }

    changeCords(x, y) {
        var dif_x = x - this.cords.x;
        var dif_y = y - this.cords.y;

        for (var point of this.#points) {
            point.changeCords(
                point.cords.x + dif_x,
                point.cords.y + dif_y
            );
        }

        super.changeCords(x, y);
    }

    changeResolution(width, height) {
        var coef_similarityX = width / this.width;
        var coef_similarityY = height / this.height;

        for (var point of this.#points) {
            point.changeCords(
                this.cords.x + (point.cords.x - this.cords.x) * coef_similarityX,
                this.cords.y + (point.cords.y - this.cords.y) * coef_similarityY 
            );
        }

        super.changeResolution(width, height);
    }
}