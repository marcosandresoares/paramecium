// Class FishLarva
class FishLarva {
    constructor(canvas, progress) {
        const random = Math.random();
        this.progress = 0;
        this.canvas = canvas;
        this.speed = 0.5 + random * 1.3

        this.x = ($(window).width() / 2) + (Math.random() * 200 - Math.random() * 200);
        this.y = ($(window).height() / 2) + (Math.random() * 200 - Math.random() * 200);

        this.s = 0.8 + Math.random() * 0.6;
        this.a = 0;

        this.w = $(window).width();
        this.h = $(window).height();
        this.radius = random * 1.3;
        this.color = "#D9A404";

        this.variantx1 = Math.random() * 1000;
        this.variantx2 = Math.random() * 1000;
        this.varianty1 = Math.random() * 1000;
        this.varianty2 = Math.random() * 1000;
    }

    render() {
        this.canvas.beginPath();
        this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.canvas.lineWidth = 2;
        this.canvas.fillStyle = this.color;
        this.canvas.fill();
        this.canvas.closePath();
    }

    move() {
        this.x += Math.cos(this.a) * this.s;
        this.y += Math.sin(this.a) * this.s;
        this.a += Math.random() * 0.8 - 0.4;
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