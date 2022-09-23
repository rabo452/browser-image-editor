import SizeChangerElement from "../SizeChangerElement.js";

// size changer element west
export default class SizeChangerElementW extends SizeChangerElement {
    mouse_move_canvas_cursor_css = "w-resize";
    
    setBtnCords() {
        this.changeCords(
            this.target_elem.cords.x - this.btn_x_offset - this.width / 2,
            this.target_elem.cords.y + (this.target_elem.height - this.height) / 2
        );
    }

    mouseMoveEvent(e) {
        if (!this.is_active) return

        var x = this.start_props.x + (e.x - this.custom_canvas_obj.offsetX) - this.start_pos.x;
        var width = this.start_props.width + this.start_props.x - x;

        if (width <= 2) {
            this.mouseUpEvent(e);
            return;
        }

        this.target_elem.changeResolution(width, this.target_elem.height);
        this.target_elem.changeCords(x, this.target_elem.cords.y);
        this.custom_canvas_obj.renderImage();
    }
}