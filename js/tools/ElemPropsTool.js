export default class ElemPropsTool {
    #elem_props = {
        width: 0,
        height: 0,
        z_index: 0
    }
    #elem = null;
    
    constructor(tool_width_input, tool_height_input, z_index_input, elem_props_tool_text, custom_canvas_obj) {
        this.tool_width_input = tool_width_input;
        this.tool_height_input = tool_height_input;
        this.custom_canvas_obj = custom_canvas_obj;
        this.z_index_input = z_index_input;
        this.tool_text_input = elem_props_tool_text;

        this.onChangeHeightInputEvent = this.onChangeHeightInputEvent.bind(this);
        this.onChangeWidthInputEvent = this.onChangeWidthInputEvent.bind(this);
        this.onChangeZIndexInputEvent = this.onChangeZIndexInputEvent.bind(this);
        this.onChangeTextInputEvent = this.onChangeTextInputEvent.bind(this);

        this.tool_width_input.addEventListener("change", this.onChangeWidthInputEvent);
        this.tool_height_input.addEventListener("change", this.onChangeHeightInputEvent);
        this.z_index_input.addEventListener("change", this.onChangeZIndexInputEvent);
        this.tool_text_input.addEventListener("change", this.onChangeTextInputEvent);
    }

    onChangeWidthInputEvent(e) {
        if (!this.#elem) {
            e.target.value = "";
        }

        var val = e.target.value;
        if (isNaN(+val)) return;
        val = +val;
        
        if (val <= 0) return;

        this.#elem_props.width = val;
        this.setResolution();
    }

    onChangeTextInputEvent(e) {
        if (!this.#elem || !this.#elem.text) {
            e.target.value = "";
        }

        this.#elem.setText(e.target.value);
        this.custom_canvas_obj.renderImage();
    }   

    onChangeHeightInputEvent(e) {
        if (!this.#elem) {
            e.target.value = "";
        }

        var val = e.target.value;
        if (isNaN(+val)) return;
        val = +val;
        
        if (val <= 0) return;
        this.#elem_props.height = val;
        this.setResolution();
    }

    onChangeZIndexInputEvent(e) {
        if (!this.#elem) {
            e.target.value = "";
        }

        var val = e.target.value;
        if (isNaN(+val)) return;
        val = +val;
        
        if (val <= 0) return;
        this.#elem.z_index = val;
        this.custom_canvas_obj.renderImage();
    }

    setElem(elem) {
        this.#elem = elem;
        this.#elem_props = {
            width: elem.width,
            height: elem.height,
            z_index: elem.z_index
        }

        if (this.#elem.text) {
            this.#elem_props.text = this.#elem.text;
            this.showText();
        }

        this.showWidth();
        this.showHeight();
        this.showZIndex();
    }
    
    removeElem() {
        this.#elem = null;
        this.#elem_props = {
            width: 0,
            height: 0,
            z_index: 0
        } 

        this.tool_width_input.value = "";
        this.tool_height_input.value = "";
        this.z_index_input.value = "";
        this.tool_text_input.value = "";
    }

    showZIndex() {
        this.z_index_input.value = this.#elem_props.z_index;
    }
    showWidth() {
        this.tool_width_input.value = this.#elem_props.width;
    }
    showHeight() {
        this.tool_height_input.value = this.#elem_props.height;
    }
    showText() {
        this.tool_text_input.value = this.#elem_props.text;
    }

    setResolution() {
        this.#elem.changeResolution(this.#elem_props.width, this.#elem_props.height);
        this.custom_canvas_obj.renderImage();
    }
}