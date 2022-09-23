import RectElement from "./RectElement.js";

export default class SelectionDashedRectElement extends RectElement {
    #target_elem = null;
    is_selectable = false;

    constructor(cords = {x: 0, y: 0}, width = 0, height = 0, z_index = 0, strokeStyle,
                dashed_line = 10, target_elem) {
        super(cords, width, height, z_index, [0, 0, 0]);
        this.lineDash = dashed_line;
        this.#target_elem = target_elem;
        this.strokeStyle = strokeStyle;
        this.setRectProps();
    }

    setRectProps() {
        this.cords = {
            x: this.#target_elem.cords.x - this.lineDash,
            y: this.#target_elem.cords.y - this.lineDash,
        }
        this.width = this.#target_elem.width;
        this.height = this.#target_elem.height;
    }

    paintElement(ctx) {
        this.setRectProps();

        ctx.setLineDash([this.lineDash]);
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.strokeStyle;
    
        ctx.beginPath();
        ctx.strokeRect(
            this.cords.x,
            this.cords.y,
            this.width + this.lineDash * 2,
            this.height + this.lineDash * 2
        );
        ctx.stroke();
    }
}