import Element from "./Element.js";
import Tool from "./Tool.js";

// TODO: set the right name of this global state class
// global state class that render the image
export default class CustomCanvas {
    #canvas_html_element;
    #ctx;
    // elements that will be rendered
    #elements = [];
    #start_resolution = {
        width: 0,
        height: 0
    }
    // the coefficent that scalling the image
    // or zoom param
    // less zoom - less size of image
    coef_similarity = 1;
    
    // elem params
    global_z_index = 0;
    rgb_color = [0, 0, 0];
    line_width = 10;
    current_tool = null;
    // all tools objects
    tools = [];
    main_image = null;
    additional_canvas = null;

    // need to set e.x e.y relativity as the canvas object left corner
    // not relativity as left corner of document
    start_offsetX = 40;
    start_offsetY= 35;
    offsetX = 40;
    offsetY = 35;

    constructor(canvas_html_element, start_width, start_height) {
        if (!(canvas_html_element instanceof HTMLCanvasElement)) {
            throw new Error("illegal argument in constructor, should be html element");
        }
        
        this.#canvas_html_element = canvas_html_element;
        this.#ctx = canvas_html_element.getContext("2d");
        this.#start_resolution = {
            width: start_width,
            height: start_height
        }

        this.#canvas_html_element.width = start_width;
        this.#canvas_html_element.height = start_height;

        // each time when user scrolling need to change the offsets
        this.changeOffsetHandler = this.changeOffsetHandler.bind(this);
        document.addEventListener("scroll", this.changeOffsetHandler);
    }

    changeOffsetHandler() {
        this.offsetY = this.start_offsetY - window.pageYOffset;
        this.offsetX = this.start_offsetX - window.pageXOffset;
    }

    // other tools by this method can get the reference for another tool by class
    getToolRef(tool_class) {
        for (var tool_ref of this.tools) {
            if (tool_ref instanceof tool_class) return tool_ref;
        }
    }

    setCurrentTool(tool) {
        if (!(tool instanceof Tool) && tool != null) {
            throw new Error("the tool should be subclass of Tool or null");
        }
        this.current_tool = tool;
    }
    
    getCtx() {
        return this.#ctx;
    }

    getCanvas() {
        return this.#canvas_html_element;
    }

    renderImage() {
        var ctx = this.#ctx;
        var coef_similarity = this.coef_similarity;
        var elements = this.#elements;
        var canvas = this.#canvas_html_element;
        var start_width = this.#start_resolution.width;
        var start_height = this.#start_resolution.height;
        
        // clear image
        ctx.clearRect(0,0, start_width, start_height);
        // set to normal all scaling and translate methods
        ctx.resetTransform();

        // set canvas resolution as setted zoom
        canvas.width = start_width * coef_similarity;
        canvas.height = start_height * coef_similarity;
        // scale image as selected zoom
        ctx.scale(coef_similarity, coef_similarity);
        
        // the elements that has less z-index should render sooner than other elements that has more z index 
        elements.sort((a, b) => a.z_index - b.z_index);

        for (var element of elements) {
            // canvas element painting the element according the inner state
            element.paintElement(ctx);
        }
    }

    // delete the element from canvas rendering
    deleteElement(element) {
        for (var i = 0; i < this.#elements.length; i++) {
            if (element == this.#elements[i]) {
                this.#elements.splice(i, 1);
                return;
            }
        }
    }

    // add element to render
    addElement(el) {
        if (!(el instanceof Element)) {
            throw new Error("element should be instance of subclass of Element class");
        }

        this.#elements.push(el);
    }

    // getting the element that has the most z index in the specified point 
    getElementAtPoint(x, y) {
        var elements = this.#elements;

        var point_elem = null;
        var max_z_index = 0;

        for (var element of elements) {
            if (!(element instanceof Element)) {
                throw new Error("in the list of elements shouldn't be not the element that not subclass of Element!");
            }
            
            if (!element.is_selectable || max_z_index >= element.z_index) continue;
            
            // it's rectangle element
            // check if point within the rectangle
            if (CustomCanvas.isXYWithinRectangle(x, y, element)) {
                point_elem = element;
                max_z_index = element.z_index;
            }
        }

        return point_elem;
    }

    static isXYWithinRectangle(x, y, element) {
        if (!(element instanceof Element)) {
            throw new Error("the rectangle should be the element subclass!");
        }
        
        return (element.cords.x <= x && 
                element.cords.y <= y &&
                element.cords.x + element.width >= x &&
                element.cords.y + element.height >= y
        );
    }
}