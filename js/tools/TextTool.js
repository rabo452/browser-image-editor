import ToolR from "../ToolR.js";
import TextElement from "../elements/TextElement.js";

export default class TextTool extends ToolR {
    canvasMouseUpEvent(e) {
        if (super.canvasMouseUpEvent(e)) return;
        
        var text = "Text";
        var ctx = this.custom_canvas_obj.getCtx();
        var font_size = 32;
        ctx.font = `${font_size}px serif`;
        let metrics = ctx.measureText(text);
        let width = metrics.width;
        var fontHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

        var element = new TextElement(
            {
                x: this.rectangle_props.x,
                y: this.rectangle_props.y
            },
            width,
            fontHeight,
            this.custom_canvas_obj.global_z_index + 1,
            this.custom_canvas_obj.rgb_color,
            text,
            font_size,
            this.custom_canvas_obj.getCtx()
        );
        this.custom_canvas_obj.addElement(element);
        this.custom_canvas_obj.renderImage();

        this.custom_canvas_obj.global_z_index++;
    }
}