import Tool from "../Tool.js";
import LineElement from "../elements/LineElement.js"
import PointElement from "../elements/PointElement.js";

export default class PaintTool extends Tool {
    // means that tool is selected by user
    // but until he's not click the mouse on canvas the tool isn't activated
    #is_tool_active = false;
    #line_element = null;

    constructor(toolBtn, custom_canvas_obj) {
        super(toolBtn, custom_canvas_obj);

        this.paintLine = this.paintLine.bind(this);
        this.stopPaint = this.stopPaint.bind(this);
        this.startPaint = this.startPaint.bind(this);
    }

    setEventsOnCanvas() {
        var canvas = this.custom_canvas_obj.getCanvas();
        canvas.addEventListener("mousemove", this.paintLine);
        canvas.addEventListener("mousedown", this.startPaint);
        canvas.addEventListener("mouseup", this.stopPaint);
        canvas.addEventListener("mouseleave", this.stopPaint);
    }

    removeEventsOnCanvas() {
        var canvas = this.custom_canvas_obj.getCanvas();

        canvas.removeEventListener("mousemove", this.paintLine);
        canvas.removeEventListener("mousedown", this.startPaint);
        canvas.removeEventListener("mouseup", this.stopPaint);
        canvas.removeEventListener("mouseleave", this.stopPaint);

        this.#is_tool_active = false;
    }
 
    paintLine(e) {
        if (!this.#is_tool_active) return;

        var x = (e.x - this.custom_canvas_obj.offsetX) / this.custom_canvas_obj.coef_similarity;
        var y = (e.y - this.custom_canvas_obj.offsetY) / this.custom_canvas_obj.coef_similarity;
        
        var point = new PointElement(
            {x: x, y: y}, 
            0, 0, 0
        );
        this.#line_element.addPoint(point);
        this.custom_canvas_obj.renderImage();
    }

    startPaint(e) {
        this.#is_tool_active = true;
        this.#line_element = new LineElement(
            {
                x: (e.x - this.custom_canvas_obj.offsetX) / this.custom_canvas_obj.coef_similarity,
                y: (e.y - this.custom_canvas_obj.offsetY) / this.custom_canvas_obj.coef_similarity
            }, 0, 0,
            this.custom_canvas_obj.global_z_index + 1,
            this.custom_canvas_obj.line_width,
            this.custom_canvas_obj.rgb_color
        );
        this.custom_canvas_obj.addElement(this.#line_element);
        this.custom_canvas_obj.global_z_index++;
        this.custom_canvas_obj.renderImage();
    }
    
    stopPaint() {
        if (!this.#is_tool_active) return;

        this.#is_tool_active = false;
        this.#line_element.setProps();
        this.#line_element = null;
    }
}