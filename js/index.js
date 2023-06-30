import ImageElement from "./elements/ImageElement.js";
import CustomCanvas from "./CustomCanvas.js";
import ZoomTool from "./tools/ZoomTool.js";
import ImageTool from "./tools/ImageTool.js";
import ColorTool from "./tools/ColorTool.js";
import PaintTool from "./tools/PaintTool.js";
import LineWidthTool from "./tools/LineWidthTool.js";
import RectTool from "./tools/RectTool.js";
import CircleTool from "./tools/CircleTool.js";
import TextTool from "./tools/TextTool.js";
import SelectTool from "./tools/SelectTool.js";
import CursorTool from "./tools/CursorTool.js";
import ElemPropsTool from "./tools/ElemPropsTool.js";
import TriangleTool from "./tools/TriangleTool.js";
import CropTool from "./tools/CropTool.js";
import SaveTool from "./tools/SaveTool.js";

// define html elements
var zoom_input = document.querySelector("#zoom-input");
var add_img_btn = document.querySelector("#add-image-btn");
var color_input = document.querySelector("#color-picker-input");
var paint_tool_btn = document.querySelector("#paint-tool-btn");
var line_width_input = document.querySelector("#line-width-input");
var save_img_btn = document.querySelector("#save-btn");
var rect_tool_btn = document.querySelector("#rectangle-tool-btn");
var triangle_tool_btn = document.querySelector("#triangle-tool-btn");
var circle_tool_btn = document.querySelector("#circle-tool-btn");
var text_tool_btn = document.querySelector("#text-tool-btn");
var select_tool_btn = document.querySelector("#edit-elems-tool-btn");
var cursor_tool_x_el = document.querySelector(".cursor-tool > #x");
var cursor_tool_y_el = document.querySelector(".cursor-tool > #y");
var elem_props_tool_width_block = document.querySelector("#elem-props-tool-width-block-id");
var elem_props_tool_height_block = document.querySelector("#elem-props-tool-height-block-id");
var elem_props_tool_z_index_block = document.querySelector("#elem-props-tool-z-index");
var elem_props_tool_text = document.querySelector("#elem-props-tool-text");
var crop_btn = document.querySelector("#crop-tool-btn");
var download_img_btn = document.querySelector("#download-image-btn");

// aditional canvas need for jobs that we can't let to use the in main canvas
var canvas = document.querySelector("#canvas");
var additional_canvas = document.querySelector("#additional-canvas");
var main_img_loader = document.querySelector("#main-image-loader");
var start_field = document.querySelector("#start-field");
var tools_block = document.querySelector("#tools-block");

// global object that render image in canvas 
var custom_canvas_obj;
var main_image = new Image();
// function that handle the start of program
main_image.onload = mainImageLoadedEvent

// load main image that the user can edit 
main_img_loader.onchange = (e) => {
    if (!main_img_loader.files || !main_img_loader.files[0]) {
        alert("please choose image for continue to work");
        return;
    }

    var file = main_img_loader.files[0];
    // convert the file obj to img tag
    var file_src = URL.createObjectURL(file);
    main_image.src = file_src;

    // hide the start input 
    // show the progarm
    canvas.style.display = "block";
    tools_block.style.display = "flex";
    start_field.style.display = "none";
}

// init events on tools buttons
function initTools() {
    var tools = [];
    tools.push(new ImageTool(add_img_btn, custom_canvas_obj));
    tools.push(new ZoomTool(zoom_input, custom_canvas_obj));
    tools.push(new ColorTool(color_input, custom_canvas_obj));
    tools.push(new PaintTool(paint_tool_btn, custom_canvas_obj));
    tools.push(new LineWidthTool(line_width_input, custom_canvas_obj));
    tools.push(new RectTool(rect_tool_btn, custom_canvas_obj));
    tools.push(new CircleTool(circle_tool_btn, custom_canvas_obj));
    tools.push(new TextTool(text_tool_btn, custom_canvas_obj));
    tools.push(new SelectTool(select_tool_btn, custom_canvas_obj));
    tools.push(new CursorTool(cursor_tool_x_el, cursor_tool_y_el, custom_canvas_obj));
    tools.push(new ElemPropsTool(elem_props_tool_width_block, elem_props_tool_height_block, elem_props_tool_z_index_block, elem_props_tool_text, custom_canvas_obj));
    tools.push(new TriangleTool(triangle_tool_btn, custom_canvas_obj));
    tools.push(new CropTool(crop_btn, custom_canvas_obj));
    tools.push(new SaveTool(save_img_btn, custom_canvas_obj, download_img_btn));
    
    // sometimes the one tool need to contact with other tool
    // so store them in one place
    custom_canvas_obj.tools = tools;
}

// main image loaded
function mainImageLoadedEvent(img) {
    var image_props = {
        width: img.path[0].width,
        height: img.path[0].height
    }

    // image was cropped, so need to recreate the tool buttons
    // as the events listeners were setted by previous handlers
    // that have the information about previous image that was cropped
    if (custom_canvas_obj) {
        clearListenersOnTools();
    }
    // after crop need to redefine the objects
    defineToolBlocks();

    // global state object creating
    custom_canvas_obj = new CustomCanvas(canvas, image_props.width, image_props.height);
    
    // create main image on canvas 
    // global state object has the link for each element that in image
    var element = new ImageElement({x: 0, y: 0}, image_props.width, image_props.height, 0, main_image);
    custom_canvas_obj.addElement(element);
    // create image by elements that the global state has
    custom_canvas_obj.renderImage();

    // need this links when the user cropped the element
    // redefine the main_image.src to new src and restart editor
    custom_canvas_obj.main_image = main_image;
    custom_canvas_obj.additional_canvas = additional_canvas;
    
    initTools();
}

function defineToolBlocks() {
    zoom_input = document.querySelector("#zoom-input");
    zoom_input.value = "100%";

    add_img_btn = document.querySelector("#add-image-btn");
    color_input = document.querySelector("#color-picker-input");
    paint_tool_btn = document.querySelector("#paint-tool-btn");
    line_width_input = document.querySelector("#line-width-input");
    save_img_btn = document.querySelector("#save-btn");
    rect_tool_btn = document.querySelector("#rectangle-tool-btn");
    triangle_tool_btn = document.querySelector("#triangle-tool-btn");
    circle_tool_btn = document.querySelector("#circle-tool-btn");
    text_tool_btn = document.querySelector("#text-tool-btn");
    select_tool_btn = document.querySelector("#edit-elems-tool-btn");
    cursor_tool_x_el = document.querySelector(".cursor-tool > #x");
    cursor_tool_y_el = document.querySelector(".cursor-tool > #y");
    elem_props_tool_width_block = document.querySelector("#elem-props-tool-width-block-id");
    elem_props_tool_height_block = document.querySelector("#elem-props-tool-height-block-id");
    elem_props_tool_z_index_block = document.querySelector("#elem-props-tool-z-index");
    elem_props_tool_text = document.querySelector("#elem-props-tool-text");
    crop_btn = document.querySelector("#crop-tool-btn");
    canvas = document.querySelector("#canvas");
}

function clearListenersOnTools() {
    var blocks = [
        zoom_input,
        add_img_btn,
        color_input,
        paint_tool_btn,
        line_width_input,
        save_img_btn,
        rect_tool_btn,
        triangle_tool_btn,
        circle_tool_btn,
        text_tool_btn,
        select_tool_btn,
        cursor_tool_x_el,
        cursor_tool_y_el,
        elem_props_tool_width_block,
        elem_props_tool_height_block,
        elem_props_tool_z_index_block,
        elem_props_tool_text,
        crop_btn,
        canvas  
    ];

    for (var el of blocks) {
        var elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);
    }
}
