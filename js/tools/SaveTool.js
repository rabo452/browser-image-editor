import Tool from "../Tool.js";

// save image tool
// when user clicked on save image button
// the canvas image will be exported as image png in local file system
export default class SaveTool extends Tool {
    constructor(save_btn, custom_canvas_obj, download_btn) {
        super(save_btn, custom_canvas_obj);
        this.download_btn = download_btn;
    }

    // save image 
    toolBtnClickEvent(e) {
        this.custom_canvas_obj.current_tool.toolBtnClickEvent(null);

        var canvas = this.custom_canvas_obj.getCanvas();
        // generate the data url of image
        var img_data_url = canvas.toDataURL('image/png');
        this.download_btn.style.display = "block";
        // automaticly start the downloading
        this.download_btn.href = img_data_url;
        this.download_btn.click();
    } 
}