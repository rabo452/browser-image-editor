import Tool from "./Tool.js";

// ToolRectangle is modified subclass of tool's functionality
// before creating some object in canvas 
// user need to see the area of future object
// so this subclass creating the functionality for showing the area to user
// before creating some object over there
export default class ToolR extends Tool {
    mouse_down = false;
    rectangle_as_square = false;
    rectangle_props = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    }
    mouse_down_cords = {
        x: 0,
        y: 0
    }  

    constructor(toolBtn, custom_canvas_obj) {
        super(toolBtn, custom_canvas_obj);

        // bind events handlers with this object
        this.canvasMouseDownEvent = this.canvasMouseDownEvent.bind(this);
        this.canvasMouseMoveEvent = this.canvasMouseMoveEvent.bind(this);
        this.canvasMouseUpEvent = this.canvasMouseUpEvent.bind(this);
        this.canvasMouseLeaveEvent = this.canvasMouseLeaveEvent.bind(this);
    }

    setEventsOnCanvas() {
        var canvas = this.custom_canvas_obj.getCanvas();
        canvas.addEventListener("mousedown", this.canvasMouseDownEvent);
        canvas.addEventListener("mousemove", this.canvasMouseMoveEvent);
        canvas.addEventListener("mouseup", this.canvasMouseUpEvent);
        canvas.addEventListener("mouseleave", this.canvasMouseLeaveEvent);
    }

    removeEventsOnCanvas() {
        var canvas = this.custom_canvas_obj.getCanvas();
        canvas.removeEventListener("mousedown", this.canvasMouseDownEvent);
        canvas.removeEventListener("mousemove", this.canvasMouseMoveEvent);
        canvas.removeEventListener("mouseup", this.canvasMouseUpEvent);
        canvas.removeEventListener("mouseleave", this.canvasMouseLeaveEvent);
    }

    canvasMouseLeaveEvent(e) {
        if (!this.mouse_down || e.button != 0) return;
        this.canvasMouseUpEvent(e);
    }

    canvasMouseDownEvent(e) {
        if (e.button != 0) return;

        this.rectangle_props = {
            x: e.x,
            y: e.y,
            width: 0,
            height: 0
        }

        // start cords that user clicked
        this.mouse_down_cords = {
            x: (e.x - this.custom_canvas_obj.offsetX) / this.custom_canvas_obj.coef_similarity,
            y: (e.y - this.custom_canvas_obj.offsetY) / this.custom_canvas_obj.coef_similarity
        }

        // before creating the object area 
        // need to know the size of area
        // so set the mousemove listener 
        // so user can set the area manually
        this.mouse_down = true;
    }

    // draw dashed rect using cords
    canvasMouseMoveEvent(e) {
        if (!this.mouse_down || e.button != 0) return;

        // current x, y 
        var x = (e.x - this.custom_canvas_obj.offsetX) / this.custom_canvas_obj.coef_similarity,
            y = (e.y - this.custom_canvas_obj.offsetY) / this.custom_canvas_obj.coef_similarity;

        this.rectangle_props = {
            // for rendering the rect we need to know the top left corner
            // if current x less than x of point that user started
            // then user going to left so the start of rect would be current x
            // the same for y
            x: x < this.mouse_down_cords.x ? x : this.mouse_down_cords.x,
            y: y < this.mouse_down_cords.y ? y : this.mouse_down_cords.y,
            width: Math.abs(this.mouse_down_cords.x - x),
            height: Math.abs(this.mouse_down_cords.y - y)
        }

        if (this.rectangle_as_square) {
            if (this.rectangle_props.width < this.rectangle_props.height) {
                this.rectangle_props.height = this.rectangle_props.width;
            }else {
                this.rectangle_props.width = this.rectangle_props.height;
            }
        }

        this.custom_canvas_obj.renderImage();
        
        this.paintDashedRect(
            this.rectangle_props.x,
            this.rectangle_props.y,
            this.rectangle_props.width,
            this.rectangle_props.height,
            "blue",
            2
        );
    }
    
    // stop selecting area
    // last time calculation
    canvasMouseUpEvent(e) {
        if (e.button != 0 || !this.mouse_down) return true;

        var x = (e.x - this.custom_canvas_obj.offsetX) / this.custom_canvas_obj.coef_similarity,
            y = (e.y - this.custom_canvas_obj.offsetY) / this.custom_canvas_obj.coef_similarity;

        this.rectangle_props = {
            x: x < this.mouse_down_cords.x ? x : this.mouse_down_cords.x,
            y: y < this.mouse_down_cords.y ? y : this.mouse_down_cords.y,
            width: Math.abs(this.mouse_down_cords.x - x),
            height: Math.abs(this.mouse_down_cords.y - y)
        }

        if (this.rectangle_as_square) {
            if (this.rectangle_props.width < this.rectangle_props.height) {
                this.rectangle_props.height = this.rectangle_props.width;
            }else {
                this.rectangle_props.width = this.rectangle_props.height;
            }
        }

        this.mouse_down = false;
        this.custom_canvas_obj.renderImage();
        
        return false;
    }

    // to paint the rect need to know the x, y of left corner and width, height
    // it's only one time when creating some objects on canvas outside render method
    paintDashedRect(x, y, width, height, strokeStyle, lineDash = 2) {
        var ctx = this.custom_canvas_obj.getCtx();
        ctx.lineWidth = lineDash;
        ctx.setLineDash([lineDash]);
        ctx.strokeStyle = strokeStyle;
    
        ctx.beginPath();
        ctx.strokeRect(
            x,
            y,
            width + lineDash * 2,
            height + lineDash * 2
        );
        ctx.stroke();
    }  
}