import ToolR from "../ToolR.js";
import CircleElement from "../elements/CircleElement.js";

// creating the circle in canvas image
export default class CircleTool extends ToolR {
    rectangle_as_square = true;
    canvasMouseUpEvent(e) {
        if (super.canvasMouseUpEvent(e)) return;
 
        var element = new CircleElement(
            {
                x: this.rectangle_props.x,
                y: this.rectangle_props.y
            },
            this.rectangle_props.width,
            this.rectangle_props.height,
            this.custom_canvas_obj.global_z_index + 1,
            this.custom_canvas_obj.rgb_color,
            this.rectangle_props.width / 2,
            this.rectangle_props.width / 2,
            {
                x: this.rectangle_props.x + this.rectangle_props.width / 2,
                y: this.rectangle_props.y + this.rectangle_props.height / 2
            }
        );
        this.custom_canvas_obj.addElement(element);
        this.custom_canvas_obj.renderImage();

        this.custom_canvas_obj.global_z_index++;
    }
}