
export default class animator {
    canvas = document.getElementsByClassName("game_canvas");
    ctx = this.canvas[0].getContext("2d");
    cHeight = this.canvas[0].height;
    cWidth = this.canvas[0].width;
    constructor() {
        this.ctx.fillStyle = "rgb(50, 50, 50)";
    }
    getLoc(percent, XorY) {
        if (XorY.toLowerCase() == 'x') {
            return this.cWidth * (percent / 100);
        }
        if (XorY.toLowerCase() == 'y') {
            return this.cHeight * (percent / 100);
        }
        console.error(XorY + " is wrong input. Please pass only x or y as string");
    }

    animate_step(step) {
        switch (step) {
            case 1:
                this.ctx.fillRect(this.getLoc(0, 'x'), this.getLoc(80, 'y'), this.getLoc(100, 'x'), this.getLoc(20, 'y'));
                break;
            case 2:
                this.ctx.fillRect(this.getLoc(30, 'x'), this.getLoc(20, 'y'), this.getLoc(1, 'x'), this.getLoc(60, 'y'));
                break;
            case 3:
                this.ctx.fillRect(this.getLoc(30, 'x'), this.getLoc(20, 'y'), this.getLoc(20, 'x'), this.getLoc(1, 'y'));
                break;
            case 4:
                this.ctx.beginPath();
                this.ctx.moveTo(this.getLoc(50, 'x'), this.getLoc(20, 'y'));
                this.ctx.lineTo(this.getLoc(50, 'x'), this.getLoc(25, 'y'));
                this.ctx.stroke();
                break;
            case 5:
                this.ctx.beginPath();
                this.ctx.arc(this.getLoc(50, 'x'), this.getLoc(30, 'y'), this.getLoc(3, 'x'), 0, Math.PI * 2, false);
                this.ctx.stroke();
                break;
            case 6:
                this.ctx.beginPath();
                this.ctx.moveTo(this.getLoc(50, 'x'), this.getLoc(35, 'y'));
                this.ctx.lineTo(this.getLoc(50, 'x'), this.getLoc(50, 'y'));
                this.ctx.stroke();
                break;
            case 7:
                this.ctx.beginPath();
                this.ctx.moveTo(this.getLoc(47, 'x'), this.getLoc(45, 'y'));
                this.ctx.lineTo(this.getLoc(50, 'x'), this.getLoc(35, 'y'));
                this.ctx.stroke();
                break;
            case 8:
                this.ctx.beginPath();
                this.ctx.moveTo(this.getLoc(53, 'x'), this.getLoc(45, 'y'));
                this.ctx.lineTo(this.getLoc(50, 'x'), this.getLoc(35, 'y'));
                this.ctx.stroke();
                break;
            case 9:
                this.ctx.beginPath();
                this.ctx.moveTo(this.getLoc(47, 'x'), this.getLoc(60, 'y'));
                this.ctx.lineTo(this.getLoc(50, 'x'), this.getLoc(50, 'y'));
                this.ctx.stroke();
                break;
            case 10:
                this.ctx.beginPath();
                this.ctx.moveTo(this.getLoc(53, 'x'), this.getLoc(60, 'y'));
                this.ctx.lineTo(this.getLoc(50, 'x'), this.getLoc(50, 'y'));
                this.ctx.stroke();
                break;
            default:
                this.ctx.clearRect(this.getLoc(0, "x"), this.getLoc(0, "y"), this.getLoc(100, "x"), this.getLoc(100, "y"))
        }
    }
}