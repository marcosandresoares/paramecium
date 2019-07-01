// Class Paramecium
class Paramecium {
    constructor(canvas) {
        const random = Math.random();
        this.progress = 0;
        this.canvas = canvas;

        // Set position
        this.x = ($(window).width() / 2) + (Math.random() * 300 - Math.random() * 300);
        this.y = ($(window).height() / 2) + (Math.random() * $(window).height() / 4 - Math.random() * $(window).height() / 4);

        // Get viewport size
        this.w = $(window).width();
        this.h = $(window).height();
        this.rotation = (random * 180) * Math.PI / 180;

        // Dimension
        this.radius = 12 + Math.random() * 6;

        // Color
        this.color = "rgba(255,255,255,1)";

        // Setting
        this.variantx1 = Math.random() * 100;
        this.variantx2 = Math.random() * 100;
        this.varianty1 = Math.random() * 100;
        this.varianty2 = Math.random() * 100;
    }

    createOval(x, y, w, h) {
        let kappa = .5522848;
        let ox = (w / 2) * kappa; // control point offset horizontal
        let oy = (h / 2) * kappa; // control point offset vertical
        let xe = x + w; // x-end
        let ye = y + h; // y-end
        let xm = x + w / 2; // x-middle
        let ym = y + h / 2; // y-middle

        this.canvas.save();

        this.canvas.translate(this.w / 2, this.h / 2);

        // Rotate 1 degree
        this.canvas.rotate(this.rotation);

        // Move registration point back to the top left corner of canvas
        this.canvas.translate(-this.w / 2, -this.h / 2);

        this.canvas.beginPath();
        this.canvas.moveTo(x, ym);
        this.canvas.quadraticCurveTo(x, y, xm, y);
        this.canvas.quadraticCurveTo(xe, y, xe, ym);
        this.canvas.quadraticCurveTo(xe, ye, xm, ye);
        this.canvas.quadraticCurveTo(x, ye, x, ym);

        this.canvas.strokeStyle = 1;
        this.canvas.fillStyle = "rgba(255,255,255,0.01)";
        this.canvas.fill();
        this.canvas.stroke();
        this.canvas.restore();
    }

    render() {
        // Create inside parts
        this.createOval(this.x, this.y, 12, 4);
    }

    move() {
        this.x += (Math.sin(this.progress / this.variantx1) * Math.cos(this.progress / this.variantx2)) / 4;
        this.y += (Math.sin(this.progress / this.varianty1) * Math.cos(this.progress / this.varianty2)) / 4;

        if (this.x < 0 || this.x > this.w - this.radius) {
            return false;
        }

        if (this.y < 0 || this.y > this.h - this.radius) {
            return false;
        }
        this.render();
        this.progress++;
        return true;
    }

}