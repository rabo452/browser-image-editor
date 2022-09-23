// base class of tools 
export default class Tool {
    constructor(toolBtn, custom_canvas_obj) {
        this.toolBtn = toolBtn;
        this.custom_canvas_obj = custom_canvas_obj;
        
        this.toolBtnClickEvent = this.toolBtnClickEvent.bind(this);
        this.toolBtn.addEventListener("click", this.toolBtnClickEvent);
    }

    // activate or deactivate the tool
    toolBtnClickEvent(e) {
        // activate this tool
        if (this.custom_canvas_obj.current_tool != this) {
            if (this.custom_canvas_obj.current_tool != null) {
                this.custom_canvas_obj.current_tool.deActivateTool();
            }

            this.custom_canvas_obj.setCurrentTool(this);
            this.setToolSelection();
            this.setEventsOnCanvas();
        }
        // deactivate tool
        else { 
            this.deActivateTool();
            this.custom_canvas_obj.setCurrentTool(null);
        }
    }

    // the selection of tool button that user can understand what tool he's using
    setToolSelection() {
        this.toolBtn.style.border = "2px dashed orange";
    }

    removeToolSelection() {
        this.toolBtn.style.removeProperty("border");
    }

    // most tools need to handle the events in canvas
    setEventsOnCanvas() {}
    removeEventsOnCanvas() {}
    deActivateTool() {
        this.removeToolSelection();
        this.removeEventsOnCanvas();
    }
}