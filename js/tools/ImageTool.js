import ToolR from "../ToolR.js";
import ImageElement from "../elements/ImageElement.js";

export default class ImageTool extends ToolR {
    img_obj = new Image();
    image_objs = []; // array that contains all image objects
    #image_props = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    }

    add_img_file_input = document.querySelector("#add-img-file-input");

    constructor(toolBtn, custom_canvas_obj) {
        super(toolBtn, custom_canvas_obj);

        this.imageSelectedEvent = this.imageSelectedEvent.bind(this);
        this.ImageLoadedEvent = this.ImageLoadedEvent.bind(this);

        this.img_obj.onload = this.ImageLoadedEvent;
        this.add_img_file_input.onchange = this.imageSelectedEvent;
    }

    canvasMouseUpEvent(e) {
        if (super.canvasMouseUpEvent(e)) return;

        this.#image_props = this.rectangle_props;

        // user didn't choose the area of future image
        if (this.#image_props.width <= 3 || this.#image_props.height <= 3) return;

        this.add_img_file_input.click();
    }

    imageSelectedEvent() {
        var add_img_file_input = this.add_img_file_input;

        if (!add_img_file_input.files || 
            !add_img_file_input.files[0]) return;
        
        var file = add_img_file_input.files[0];
        var file_src = URL.createObjectURL(file);
        this.img_obj.src = file_src;
    }

    ImageLoadedEvent(img) {
        var element = new ImageElement(
            {
                x: this.#image_props.x, 
                y: this.#image_props.y
            }, 
            this.#image_props.width, 
            this.#image_props.height, 
            this.custom_canvas_obj.global_z_index + 1, 
            this.img_obj
        );
        
        // add image obj to image array
        this.image_objs.push(this.img_obj);
        this.img_obj = new Image();
        this.img_obj.onload = this.ImageLoadedEvent;

        this.custom_canvas_obj.addElement(element);
        this.custom_canvas_obj.renderImage();
    
        this.custom_canvas_obj.global_z_index++;
    }
}