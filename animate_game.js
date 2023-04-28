const middle_gray = "#808080";
export default class animator {
    canvas = document.getElementsByID("game_canvas");
    ctx = this.canvas[0].getContext("2d");
    cHeight = this.canvas[0].height;
    cWidth = this.canvas[0].width;
    constructor(lineScale) {
        this.ctx.strokeStyle = middle_gray;
        this.ctx.fillStyle = middle_gray;
        this.ctx.lineWidth = (lineScale / 100) * ((this.cWidth * 0.01) * (this.cHeight * 0.0025));
    }
    getLoc(percentX, percentY) {
        var x = this.cWidth * (percentX / 100);
        var y = this.cHeight * (percentY / 100);
        return [x, y];
    }

    animate_step(step) {
        switch (step) {
            case 1:
                this.ctx.fillRect(...this.getLoc(0, 90), ...this.getLoc(100, 1));
                break;
            case 2:
                this.ctx.fillRect(...this.getLoc(15, 0), ...this.getLoc(1, 90));
                this.ctx.beginPath();
                this.ctx.moveTo(...this.getLoc(20.5, 90));
                this.ctx.lineTo(...this.getLoc(15.5, 85));
                this.ctx.moveTo(...this.getLoc(10.5, 90));
                this.ctx.lineTo(...this.getLoc(15.5, 85));
                this.ctx.stroke();
                break;
            case 3:
                this.ctx.fillRect(...this.getLoc(15, 0), ...this.getLoc(40, 1));
                break;
            case 4:
                this.ctx.beginPath();
                this.ctx.moveTo(...this.getLoc(55, 0));
                this.ctx.lineTo(...this.getLoc(55, 15));
                this.ctx.stroke();
                break;
            case 5:
                this.ctx.beginPath();
                this.ctx.arc(...this.getLoc(55, 25), ...this.getLoc(6, 0), Math.PI * 2, false);
                this.ctx.stroke();
                break;
            case 6:
                this.ctx.beginPath();
                this.ctx.moveTo(...this.getLoc(55, 35));
                this.ctx.lineTo(...this.getLoc(55, 55));
                this.ctx.stroke();
                break;
            case 7:
                this.ctx.beginPath();
                this.ctx.moveTo(...this.getLoc(45, 45));
                this.ctx.lineTo(...this.getLoc(55, 35));
                this.ctx.stroke();
                break;
            case 8:
                this.ctx.beginPath();
                this.ctx.moveTo(...this.getLoc(65, 45));
                this.ctx.lineTo(...this.getLoc(55, 35));
                this.ctx.stroke();
                break;
            case 9:
                this.ctx.beginPath();
                this.ctx.moveTo(...this.getLoc(45, 65));
                this.ctx.lineTo(...this.getLoc(55, 55));
                this.ctx.stroke();
                break;
            case 10:
                this.ctx.beginPath();
                this.ctx.moveTo(...this.getLoc(65, 65));
                this.ctx.lineTo(...this.getLoc(55, 55));
                this.ctx.stroke();
                break;
            default:
                this.ctx.clearRect(...this.getLoc(0, 0), ...this.getLoc(100, 100));
        }
    }
}