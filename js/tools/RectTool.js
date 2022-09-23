import RectElement from "../elements/RectElement.js";
import ToolR from "../ToolR.js";

export default class RectTool extends ToolR {
    canvasMouseUpEvent(e) {
        if (super.canvasMouseUpEvent(e)) return;

        var element = new RectElement(
            {
                x: this.rectangle_props.x,
                y: this.rectangle_props.y
            },
            this.rectangle_props.width,
            this.rectangle_props.height,
            this.custom_canvas_obj.global_z_index + 1,
            this.custom_canvas_obj.rgb_color
        );
        this.custom_canvas_obj.addElement(element);
        this.custom_canvas_obj.renderImage();

        this.custom_canvas_obj.global_z_index++;
    }
}