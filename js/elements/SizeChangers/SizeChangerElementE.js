import SizeChangerElement from "../SizeChangerElement.js";

// size changer element east
export default class SizeChangerElementE extends SizeChangerElement {
    mouse_move_canvas_cursor_css = "e-resize";

    setBtnCords() {
        this.changeCords(
            this.target_elem.cords.x + this.target_elem.width - this.width / 2 + this.btn_x_offset,
            this.target_elem.cords.y + (this.target_elem.height - this.height) / 2
        );
    }
 
    mouseMoveEvent(e) {
        if (!this.is_active) return

        var width = this.start_props.width + (e.x - this.custom_canvas_obj.offsetX) - this.start_pos.x;

        if (width <= 2) {
            this.mouseUpEvent(e);
            return;
        }

        this.target_elem.changeResolution(width, this.target_elem.height);
        this.custom_canvas_obj.renderImage();
    }
}