import ToolR from "../ToolR.js";
import TriangleElement from "../elements/TriangleElement.js";

export default class TriangleTool extends ToolR {
    canvasMouseUpEvent(e) {
        if (super.canvasMouseUpEvent(e)) return;

        var triangle_points = {
            top: {
                x: this.rectangle_props.x + this.rectangle_props.width / 2,
                y: this.rectangle_props.y
            },
            right: {
                x: this.rectangle_props.x + this.rectangle_props.width,
                y: this.rectangle_props.y + this.rectangle_props.height
            },
            left: {
                x: this.rectangle_props.x,
                y: this.rectangle_props.y + this.rectangle_props.height
            }
        }
        var rgb_color = this.custom_canvas_obj.rgb_color;

        var element = new TriangleElement(
            {
                x: this.rectangle_props.x,
                y: this.rectangle_props.y
            },
            this.rectangle_props.width,
            this.rectangle_props.height,
            this.custom_canvas_obj.global_z_index + 1,
            triangle_points.top,
            triangle_points.left,
            triangle_points.right,
            rgb_color
        );
        this.custom_canvas_obj.addElement(element);
        this.custom_canvas_obj.renderImage();

        this.custom_canvas_obj.global_z_index++;
    }
}