import Tool from "../Tool.js";

export default class SaveTool extends Tool {
    constructor(save_btn, custom_canvas_obj, download_btn) {
        super(save_btn, custom_canvas_obj);
        this.download_btn = download_btn;
    }

    // save image 
    toolBtnClickEvent(e) {
        this.custom_canvas_obj.current_tool.toolBtnClickEvent(null);

        var canvas = this.custom_canvas_obj.getCanvas();
        var img_data_url = canvas.toDataURL('image/png');
        this.download_btn.style.display = "block";
        this.download_btn.href = img_data_url;
        this.download_btn.click();
    } 
}