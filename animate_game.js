
export default class animator {
    canvas = document.getElementsByClassName("game_canvas");
    ctx = this.canvas[0].getContext("2d");
    cHeight = this.canvas[0].height;
    cWidth = this.canvas[0].width;
    constructor(lineScale) {
        this.ctx.fillStyle = "rgb(50, 50, 50)";
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
                this.ctx.fillRect(...this.getLoc(0, 80), ...this.getLoc(100, 20));
                break;
            case 2:
                this.ctx.fillRect(...this.getLoc(30, 20), ...this.getLoc(1, 60));
                this.ctx.beginPath();
                this.ctx.moveTo(...this.getLoc(35.5, 80));
                this.ctx.lineTo(...this.getLoc(30.5, 75));
                this.ctx.moveTo(...this.getLoc(25.5, 80));
                this.ctx.lineTo(...this.getLoc(30.5, 75));
                this.ctx.stroke();
                break;
            case 3:
                this.ctx.fillRect(...this.getLoc(30, 20), ...this.getLoc(20, 1));
                break;
            case 4:
                this.ctx.beginPath();
                this.ctx.moveTo(...this.getLoc(50, 20));
                this.ctx.lineTo(...this.getLoc(50, 25));
                this.ctx.stroke();
                break;
            case 5:
                this.ctx.beginPath();
                this.ctx.arc(...this.getLoc(50, 30), ...this.getLoc(3, 0), Math.PI * 2, false);
                this.ctx.stroke();
                break;
            case 6:
                this.ctx.beginPath();
                this.ctx.moveTo(...this.getLoc(50, 35));
                this.ctx.lineTo(...this.getLoc(50, 50));
                this.ctx.stroke();
                break;
            case 7:
                this.ctx.beginPath();
                this.ctx.moveTo(...this.getLoc(47, 45));
                this.ctx.lineTo(...this.getLoc(50, 35));
                this.ctx.stroke();
                break;
            case 8:
                this.ctx.beginPath();
                this.ctx.moveTo(...this.getLoc(53, 45));
                this.ctx.lineTo(...this.getLoc(50, 35));
                this.ctx.stroke();
                break;
            case 9:
                this.ctx.beginPath();
                this.ctx.moveTo(...this.getLoc(47, 60));
                this.ctx.lineTo(...this.getLoc(50, 50));
                this.ctx.stroke();
                break;
            case 10:
                this.ctx.beginPath();
                this.ctx.moveTo(...this.getLoc(53, 60));
                this.ctx.lineTo(...this.getLoc(50, 50));
                this.ctx.stroke();
                break;
            default:
                this.ctx.clearRect(...this.getLoc(0, 0), ...this.getLoc(100, 100));
        }
    }
}