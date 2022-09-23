export default class CursorTool {
    #current_pos = {
        x: 0,
        y: 0
    }

    constructor(x_el, y_el, custom_canvas_obj) {
        this.x_el = x_el;
        this.y_el = y_el;
        this.custom_canvas_obj = custom_canvas_obj;

        this.moveMoveHandler = this.moveMoveHandler.bind(this);
        custom_canvas_obj.getCanvas().addEventListener("mousemove", this.moveMoveHandler);
    }

    moveMoveHandler(e) {
        this.x_el.innerHTML = `x: ${e.x - this.custom_canvas_obj.offsetX}`;
        this.y_el.innerHTML = `y: ${e.y - this.custom_canvas_obj.offsetY}`;

        this.#current_pos.x = e.x - this.custom_canvas_obj.offsetX;
        this.#current_pos.y = e.y - this.custom_canvas_obj.offsetY;
    }
}