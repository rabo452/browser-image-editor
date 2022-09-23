import SelectTool from "./SelectTool.js";

// tool that changes the color of objects that has attribute rgb_color
export default class ColorTool {
    constructor(color_input, custom_canvas_obj) {
        this.custom_canvas_obj = custom_canvas_obj;
        this.color_input = color_input;
        this.onChangeHandler = this.onChangeHandler.bind(this);
        color_input.onchange = this.onChangeHandler;
    }

    onChangeHandler(e) {
        this.custom_canvas_obj.rgb_color = this.hexToRgb(e.target.value);
        // if current tool is select tool then change the selected element rgb_color 
        // (as user wanted to change the color of this element)
        if (this.custom_canvas_obj.current_tool instanceof SelectTool) {
            this.custom_canvas_obj.current_tool.setColorOnSelectedElem(this.hexToRgb(e.target.value));
        }        
    }

    setColor(hexColor) {
        this.color_input.value = hexColor;
        this.custom_canvas_obj.rgb_color = this.hexToRgb(hexColor);
    }

    static componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
      
    static rgbToHex(r, g, b) {
        return "#" + ColorTool.componentToHex(r) + ColorTool.componentToHex(g) + ColorTool.componentToHex(b);
    }

    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16)
        ] : [0, 0, 0];
    }
}