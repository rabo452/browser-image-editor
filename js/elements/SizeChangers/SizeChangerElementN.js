import SizeChangerElement from "../SizeChangerElement.js";

// size changer element north direction
export default class SizeChangerElementN extends SizeChangerElement {
    mouse_move_canvas_cursor_css = "n-resize";
    
    setBtnCords() {
        this.changeCords(
            this.target_elem.cords.x + (this.target_elem.width - this.width) / 2,
            this.target_elem.cords.y - this.btn_y_offset - this.height / 2
        );
    }

    mouseMoveEvent(e) {
        if (!this.is_active) return

        var y = this.start_props.y + (e.y - this.custom_canvas_obj.offsetY) - this.start_pos.y;
        var height = this.start_props.height + this.start_props.y - y;

        if (height <= 2) {
            this.mouseUpEvent(e);
            return;
        }

        this.target_elem.changeCords(this.target_elem.cords.x, y);
        this.target_elem.changeResolution(this.target_elem.width, height);
        this.custom_canvas_obj.renderImage();
    }
} 