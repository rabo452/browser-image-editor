import CustomCanvas from "../CustomCanvas.js";

export default class ZoomTool {
    custom_canvas_obj = null;

    constructor(zoom_input, custom_canvas_obj) {
        if (!(custom_canvas_obj instanceof CustomCanvas)) {
            throw new Error("custom canvas obj should be class CustomCanvas");
        }

        this.custom_canvas_obj = custom_canvas_obj;
        this.changeZoomEvent = this.changeZoomEvent.bind(this);
        zoom_input.onchange = this.changeZoomEvent;
    }

    changeZoomEvent(e) {
        var input = e.target;
        var zoom_percent = +input.value.replace("%", "");
    
        if (!zoom_percent || isNaN(zoom_percent) || zoom_percent <= 0) {
            alert("make sure that you entered right value")
            return;
        }
    
        if (zoom_percent > 400) {
            alert("zoom percent can't be more than 400 units");
            return;
        }
    
        zoom_percent = Math.round(zoom_percent);
        input.value = `${zoom_percent}%`;
        this.custom_canvas_obj.coef_similarity = zoom_percent / 100;
        this.custom_canvas_obj.renderImage();
    }
}