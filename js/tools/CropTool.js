import ToolR from "../ToolR.js";

export default class CropTool extends ToolR {
    canvasMouseUpEvent(e) {
        if (super.canvasMouseUpEvent(e)) return;

        this.custom_canvas_obj.renderImage();

        var ctx = this.custom_canvas_obj.getCtx();
        var canvas = this.custom_canvas_obj.additional_canvas;
         
        var img_data = ctx.getImageData(
            this.rectangle_props.x * this.custom_canvas_obj.coef_similarity, 
            this.rectangle_props.y * this.custom_canvas_obj.coef_similarity, 
            this.rectangle_props.width * this.custom_canvas_obj.coef_similarity, 
            this.rectangle_props.height * this.custom_canvas_obj.coef_similarity
        );
        
        canvas.width = img_data.width;
        canvas.height = img_data.height;
        canvas.getContext("2d").putImageData(img_data, 0, 0);

        var img_data_url = canvas.toDataURL();
        this.deActivateTool();
        this.custom_canvas_obj.main_image.src = img_data_url;
    }
}