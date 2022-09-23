import Element from "../Element.js";
import CustomCanvas from "../CustomCanvas.js";

// change the element properties (width, height) by using the subclasses of this element
// the next subclasses listed in SizeChangers
// after the main naming the letter means the direction of button that it handle
export default class SizeChangerElement extends Element {
    target_elem = null;
    is_active = false;
    mouse_move_canvas_cursor_css = "";
    btn_y_offset = 5;
    btn_x_offset = 5;
    start_props = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    }
    start_pos = {
        x: 0,
        y: 0
    }

    constructor(element, custom_canvas_obj) {
        var z_index = 1000,
            width = 10,
            height = 10,
            cords = {
                x: 0, 
                y: 0
            }

        super(cords, width, height, z_index);
        this.rgb_color = [230, 230, 230];
        this.target_elem = element;
        this.custom_canvas_obj = custom_canvas_obj;
        this.setBtnCords();

        this.mouseDownEvent = this.mouseDownEvent.bind(this);
        this.mouseUpEvent = this.mouseUpEvent.bind(this);
        this.mouseLeaveEvent = this.mouseLeaveEvent.bind(this);
        this.mouseMoveEvent = this.mouseMoveEvent.bind(this);
    }

    // at what direction will be created the button
    setBtnCords() {}

    setEventsOnCanvas() {
        var canvas = this.custom_canvas_obj.getCanvas();
        canvas.addEventListener("mousedown", this.mouseDownEvent);
        canvas.addEventListener("mouseup", this.mouseUpEvent);
        canvas.addEventListener("mouseleave", this.mouseLeaveEvent);
        canvas.addEventListener("mousemove", this.mouseMoveEvent);
    }

    removeEventsOnCanvas() {
        var canvas = this.custom_canvas_obj.getCanvas();
        canvas.removeEventListener("mousedown", this.mouseDownEvent);
        canvas.removeEventListener("mouseup", this.mouseUpEvent);
        canvas.removeEventListener("mouseleave", this.mouseLeaveEvent);
        canvas.removeEventListener("mousemove", this.mouseMoveEvent);
    }

    mouseLeaveEvent(e) {
        if (this.is_active) {
            this.mouseUpEvent(e);
        }
    }
    
    // the manipulations that need to make while moving the element
    mouseMoveEvent(e) {}
    
    mouseDownEvent(e) {
        // check if user clicked on this element
        var x = (e.x - this.custom_canvas_obj.offsetX) / this.custom_canvas_obj.coef_similarity;
        var y = (e.y - this.custom_canvas_obj.offsetY) / this.custom_canvas_obj.coef_similarity;
        
        if (!CustomCanvas.isXYWithinRectangle(x, y, this)) return true;

        this.is_active = true;
        this.start_pos = {
            x: x * this.custom_canvas_obj.coef_similarity, y: y * this.custom_canvas_obj.coef_similarity
        }
        // start props of element that we're changing
        this.start_props = {
            x: this.target_elem.cords.x,
            y: this.target_elem.cords.y,
            width: this.target_elem.width,
            height: this.target_elem.height 
        }

        // set the new cursor 
        this.custom_canvas_obj.getCanvas().style.cursor = this.mouse_move_canvas_cursor_css;
    }
    
    mouseUpEvent(e) {
        if (!this.is_active) return;
        this.is_active = false;
        this.custom_canvas_obj.getCanvas().style.removeProperty("cursor");
    }
    
    // paint usual white square
    paintElement(ctx) {
        this.setBtnCords();
        var rgb = this.rgb_color;

        ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        
        ctx.beginPath();
        ctx.rect(
            this.cords.x,
            this.cords.y,
            this.width,
            this.height
        )
        ctx.fill();
        ctx.beginPath();
    }
}