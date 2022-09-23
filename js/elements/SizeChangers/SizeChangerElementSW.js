import SizeChangerElement from "../SizeChangerElement.js";
import SizeChangerElementW from "./SizeChangerElementW.js";
import SizeChangerElementS from "./SizeChangerElementS.js";

// size changer element south-west direction
export default class SizeChangerElementSW extends SizeChangerElement {
    mouse_move_canvas_cursor_css = "sw-resize";
    
    setBtnCords() {
        this.changeCords(
            this.target_elem.cords.x - this.btn_x_offset - this.width / 2,
            this.target_elem.cords.y + this.target_elem.height + this.btn_y_offset - this.height / 2
        );
    }

    mouseMoveEvent(e) {
        if (!this.is_active) return

        // use the code that already implemented
        var horizontal_obj = new SizeChangerElementW(this.target_elem, this.custom_canvas_obj);
        var vertical_obj = new SizeChangerElementS(this.target_elem, this.custom_canvas_obj);

        horizontal_obj.mouseUpEvent = horizontal_obj.mouseUpEvent.bind(this);
        vertical_obj.mouseUpEvent = vertical_obj.mouseUpEvent.bind(this);

        horizontal_obj.is_active = vertical_obj.is_active = true;

        horizontal_obj.start_pos = vertical_obj.start_pos = this.start_pos;
        horizontal_obj.start_props = vertical_obj.start_props = this.start_props;

        horizontal_obj.mouseMoveEvent(e);
        vertical_obj.mouseMoveEvent(e);
    }
}