import SelectTool from "./SelectTool.js";

// tool that sets the line width of line that paint tool maden
export default class LineWidthTool {
    constructor(input_block, custom_canvas_obj) {
        this.custom_canvas_obj = custom_canvas_obj;
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.input_block = input_block
        input_block.onchange = this.onChangeHandler;
    }

    onChangeHandler(e) {
        var val = e.target.value;
        if (isNaN(+val) || +val <= 0) {
            e.target.value = this.custom_canvas_obj.line_width;
            return;
        }
        this.custom_canvas_obj.line_width = +val;

        // if current tool is select tool then change the line width of current selected element 
        // (if this property exists)
        if (this.custom_canvas_obj.current_tool instanceof SelectTool) {
            this.custom_canvas_obj.getToolRef(SelectTool).setWidthLineOnSelectedElem(+val);
        }
    }

    setLineWidth(val) {
        this.input_block.value = val;
    }
}