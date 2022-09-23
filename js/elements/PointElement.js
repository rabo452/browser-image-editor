import Element from "../Element.js";

export default class PointElement extends Element {
    paintElement(ctx, lineWidth, rgb_color) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = ctx.fillStyle = `rgb(${rgb_color[0]}, ${rgb_color[1]}, ${rgb_color[2]})`;
        
        ctx.lineTo(this.cords.x, this.cords.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.cords.x, this.cords.y, lineWidth / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.lineTo(this.cords.x, this.cords.y);
    }
}