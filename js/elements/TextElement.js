import Element from "../Element.js";
import CustomCanvas from "../CustomCanvas.js";

export default class TextElement extends Element {
    constructor(cords = {x: 0, y: 0}, width = 0, height = 0, 
        z_index = 0, rgb_color = [0, 0, 0], text = "", font_size = 0, ctx) {
        super(cords, width, height, z_index);
        this.rgb_color = rgb_color;
        this.text = text;
        this.font_size = font_size;
        this.ctx = ctx;
    }

    setText(text) {
        this.text = text;

        this.ctx.font = `${this.font_size}px serif`;
        var metrics = this.ctx.measureText(this.text);
        var width = metrics.width,
            height = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
        
        this.changeResolution(width, height);
    }

    paintElement(ctx) {
        var rgb = this.rgb_color;
        ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        ctx.font = `${this.font_size}px serif`;
        ctx.textBaseline='top';
        ctx.textAlign='start';

        ctx.fillText(this.text, this.cords.x, this.cords.y);
        ctx.beginPath();
    }

    changeResolution(width, height) {
        this.font_size = this.getFontSizeByWidth(width);
            
        this.ctx.font = `${this.font_size}px serif`;
        var metrics = this.ctx.measureText(this.text);
        height = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;

        super.changeResolution(width, height);
    }

    getFontSizeByWidth(width) {
        var ctx = this.ctx;
        var font_size = .2;

        while (true) {
            ctx.font = `${font_size}px serif`;
            var metrics = ctx.measureText(this.text);
            if (metrics.width >= width) return font_size;
            font_size += .4;
        }
    }
}