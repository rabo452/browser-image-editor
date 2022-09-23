import Tool from "../Tool.js";
import ColorTool from "./ColorTool.js";
import ElemPropsTool from "./ElemPropsTool.js";
import SizeChangerElement from "../elements/SizeChangerElement.js";
import SelectionDashedRectElement from "../elements/SelectionDashedRectElement.js";
import SizeChangerElementN from "../elements/SizeChangers/SizeChangerElementN.js";
import SizeChangerElementE from "../elements/SizeChangers/SizeChangerElementE.js";
import SizeChangerElementW from "../elements/SizeChangers/SizeChangerElementW.js";
import SizeChangerElementS from "../elements/SizeChangers/SizeChangerElementS.js";
import SizeChangerElementNW from "../elements/SizeChangers/SizeChangerElementNW.js";
import SizeChangerElementNE from "../elements/SizeChangers/SizeChangerElementNE.js";
import SizeChangerElementSW from "../elements/SizeChangers/SizeChangerElementSW.js";
import SizeChangerElementSE from "../elements/SizeChangers/SizeChangerElementSE.js";

// selecting this tool user can select the element on canvas
// and edit it as he wants
export default class SelectTool extends Tool {
    #selected_elem = null;
    // moving element now or not
    #is_moving = false;
    // start moving event pos
    #start_move_pos = {
        x: 0,
        y: 0
    }
    // start moving props of element
    #start_elem_pos = {
        x: 0,
        y: 0
    }
    
    // additional tools that works only with selectTool
    // tools that changes the element size
    #size_changes = [];
    // selection rect that user can understand what element he's editting
    #selection_rect = null;
    // while moving the element this cursor will be shown
    #mouse_move_canvas_cursor_css = "grabbing";

    constructor(toolBtn, custom_canvas_obj) {
        super(toolBtn, custom_canvas_obj);

        this.moveElemHandler = this.moveElemHandler.bind(this);
        this.stopMoveElemHandler = this.stopMoveElemHandler.bind(this);
        this.selectElem = this.selectElem.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
    }

    toolBtnClickEvent(e) {
        this.custom_canvas_obj.renderImage();
        super.toolBtnClickEvent(e);

        // remove elem if this tool deactivated
        this.#is_moving = false;
        this.#selected_elem = null;
    }
    
    setEventsOnCanvas() {
        var canvas = this.custom_canvas_obj.getCanvas();
        canvas.addEventListener("mousedown", this.selectElem);
        canvas.addEventListener("mousemove", this.moveElemHandler);
        canvas.addEventListener("mouseup", this.stopMoveElemHandler);
        canvas.addEventListener("mouseleave", this.stopMoveElemHandler);
        document.addEventListener("keydown", this.keyDownHandler);
    }

    removeEventsOnCanvas() {
        var canvas = this.custom_canvas_obj.getCanvas();
        canvas.removeEventListener("mousedown", this.selectElem);
        canvas.removeEventListener("mousemove", this.moveElemHandler);
        canvas.removeEventListener("mouseup", this.stopMoveElemHandler);
        canvas.removeEventListener("mouseleave", this.stopMoveElemHandler);
        document.removeEventListener("keydown", this.keyDownHandler);
    }

    deActivateTool() {
        // after the tool is deactivated 
        // change the color input as default color (that written in global obj)
        var rgb_color = this.custom_canvas_obj.rgb_color;
        var hex_color = ColorTool.rgbToHex(rgb_color[0], rgb_color[1], rgb_color[2]);
        // get color tool and set the value
        var color_tool_ref = this.custom_canvas_obj.getToolRef(ColorTool);
        color_tool_ref.setColor(hex_color);

        // remove element props tool target element
        this.custom_canvas_obj.getToolRef(ElemPropsTool).removeElem();
        // remove size changes from elements list to render
        // remove selection rect from elements list to render
        this.removeSelectionRect();
        this.removeSizeChanges();

        super.deActivateTool();

        this.custom_canvas_obj.renderImage();
    }

    // if user changed the color in color tool
    // then he's meaning to change the target element rgb color
    // if selected element has the rgb_color then change it
    setColorOnSelectedElem(rgb_color = []) {
        if (!this.#selected_elem || this.#is_moving) return;
        this.#selected_elem.rgb_color = [rgb_color[0], rgb_color[1], rgb_color[2]];
        this.custom_canvas_obj.renderImage();
    }

    // if user changed the line width in tool
    // then he's meaning to change the line width property of selected element 
    setWidthLineOnSelectedElem(line_width) {
        this.#selected_elem.lineWidth = line_width;
        this.custom_canvas_obj.renderImage();
    }

    // if user selected the element and typed button "DELETE"
    // then element will be deleted from list of elements to render 
    keyDownHandler(e) {
        // the handler setted for whole doc
        // if the target is input then left this
        if (e.target.tagName == "INPUT") return;
        
        if (e.key == "Backspace" 
            && this.#selected_elem
            && !this.#is_moving) 
        {
            this.removeSelectionRect();
            this.removeSizeChanges();
            this.custom_canvas_obj.deleteElement(this.#selected_elem);
            this.#selected_elem = null;
            this.custom_canvas_obj.renderImage();
        }
    }

    // check: Was the user hitted to some element or not
    // if yes - select it
    selectElem(e) {
        var x = (e.x - this.custom_canvas_obj.offsetX) / this.custom_canvas_obj.coef_similarity;
        var y = (e.y - this.custom_canvas_obj.offsetY) / this.custom_canvas_obj.coef_similarity;
        var elem_found = this.custom_canvas_obj.getElementAtPoint(x,y);
        
        // if hitted element is sizechanger - left
        // if not then size changers won't work
        // as the events handlers that setted in them won't be started
        if (elem_found instanceof SizeChangerElement) return;

        var elem_props_tool = this.custom_canvas_obj.getToolRef(ElemPropsTool);
        elem_props_tool.removeElem();
        this.removeSizeChanges();
        this.removeSelectionRect();

        this.custom_canvas_obj.renderImage();

        this.#selected_elem = elem_found;
        if (!this.#selected_elem) return;

        this.addSelectionRect(this.#selected_elem);
        elem_props_tool.setElem(this.#selected_elem);
        this.initSizeChanges(this.#selected_elem);

        this.custom_canvas_obj.renderImage();

        this.#start_move_pos = {
            x: e.x,
            y: e.y
        }
        this.#start_elem_pos = {
            x: this.#selected_elem.cords.x,
            y: this.#selected_elem.cords.y
        }
        this.#is_moving = true;

        // change color in color input
        // if the selected elem has color attr
        if (this.#selected_elem.rgb_color) {
            var rgb_color = this.#selected_elem.rgb_color;
            var hex_color = ColorTool.rgbToHex(rgb_color[0], rgb_color[1], rgb_color[2]);

            // get color tool and set the value
            var color_tool_ref = this.custom_canvas_obj.getToolRef(ColorTool);
            color_tool_ref.setColor(hex_color);
        }

        this.custom_canvas_obj.getCanvas().style.cursor = this.#mouse_move_canvas_cursor_css;
    }

    moveElemHandler(e) {
        if (!this.#selected_elem || !this.#is_moving) return;

        this.#selected_elem.changeCords(
            this.#start_elem_pos.x + (e.x - this.#start_move_pos.x) / this.custom_canvas_obj.coef_similarity,
            this.#start_elem_pos.y + (e.y - this.#start_move_pos.y) / this.custom_canvas_obj.coef_similarity
        );
        
        this.removeSizeChanges();
        this.initSizeChanges();

        this.custom_canvas_obj.renderImage();
    }

    stopMoveElemHandler(e) {
        if (!this.#selected_elem || !this.#is_moving) return;

        this.#is_moving = false;
        this.custom_canvas_obj.renderImage();

        this.custom_canvas_obj.getCanvas().style.removeProperty("cursor");
    }

    initSizeChanges() {
        var element = this.#selected_elem;

        var size_changes = [
            new SizeChangerElementNE(element, this.custom_canvas_obj),
            new SizeChangerElementNW(element, this.custom_canvas_obj),
            new SizeChangerElementN(element, this.custom_canvas_obj),
            new SizeChangerElementW(element, this.custom_canvas_obj),
            new SizeChangerElementE(element, this.custom_canvas_obj),
            new SizeChangerElementS(element, this.custom_canvas_obj),
            new SizeChangerElementSW(element, this.custom_canvas_obj),
            new SizeChangerElementSE(element, this.custom_canvas_obj),
        ];

        for (var elem of size_changes) {
            elem.setEventsOnCanvas();
            this.custom_canvas_obj.addElement(elem);
        }

        this.#size_changes = size_changes;
    }

    removeSizeChanges() {
        for (var elem of this.#size_changes) {
            elem.removeEventsOnCanvas();
            this.custom_canvas_obj.deleteElement(elem);
        }

        this.#size_changes = [];
    }

    addSelectionRect(element) {
        var rect = new SelectionDashedRectElement({x: 0, y: 0}, 0, 0, 1001, "blue", 5, element);
        this.#selection_rect = rect;
        this.custom_canvas_obj.addElement(rect);
    }

    removeSelectionRect() {
        if (!this.#selection_rect) return;
        this.custom_canvas_obj.deleteElement(this.#selection_rect);
        this.#selection_rect = null;
    }
}