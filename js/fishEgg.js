// Class FishEgg
class FishEgg {
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

        // Dimension
        this.radius = 12 + Math.random() * 6;
        // Color
        this.color = "rgba(255,255,255,1)";
        // Setting
        this.fish_egg = {
            offset1: Math.random() > 0.5 ? 0.5 + Math.random() * 3 : 0.5 + Math.random() * -3,
            offset2: Math.random() > 0.5 ? 0.5 + Math.random() * 3 : 0.5 + Math.random() * -3,
            offset3: Math.random() > 0.5 ? 0.5 + Math.random() * 3 : 0.5 + Math.random() * -3,
            radius1: 0.5 + Math.random() * 5,
            radius2: 0.5 + Math.random() * 5,
            radius3: 0.5 + Math.random() * 5
        }
        this.variantx1 = Math.random() * 100;
        this.variantx2 = Math.random() * 100;
        this.varianty1 = Math.random() * 100;
        this.varianty2 = Math.random() * 100;
    }

    createCircle(x, y, r, c) {
        this.canvas.beginPath();
        this.canvas.fillStyle = c;
        this.canvas.arc(x, y, r, 0, Math.PI * 2, false);
        this.canvas.fill();
        this.canvas.closePath();
    }

    createEyes() {
        this.createCircle(this.x + this.fish_egg.offset2, this.y + this.fish_egg.offset2, this.fish_egg.radius2 + 4, "rgba(217, 164, 4, 0.06)");
        this.createCircle(this.x + this.fish_egg.offset3, this.y + this.fish_egg.offset3, this.fish_egg.radius3 + 2, "rgba(245, 100, 84, 0.08)");
        this.createCircle(this.x + (Math.random(this.progress / 350) * this.fish_egg.offset1), this.y + (Math.random(this.progress / 350) * this.fish_egg.offset1), this.fish_egg.radius1, "rgba(140, 79, 124, 0.19)");
    }

    render() {
        // Create inside parts
        this.createEyes();

        this.canvas.beginPath();
        let c = '10, 18, 64';
        let rad = this.canvas.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, 1);
        rad.addColorStop(0, 'rgba(' + c + ',0.09)');
        rad.addColorStop(0.9, 'rgba(' + c + ',0)');
        this.canvas.lineWidth = Math.random() * 2.2;
        this.canvas.fillStyle = rad;
        this.canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.canvas.fill();
        this.canvas.strokeStyle = "rgba(255, 255, 217, 0.05)";
        this.canvas.stroke();
        this.canvas.closePath();
    }

    move() {
        this.x += (Math.sin(this.progress / this.variantx1) * Math.cos(this.progress / this.variantx2)) / 8;
        this.y += (Math.sin(this.progress / this.varianty1) * Math.cos(this.progress / this.varianty2)) / 8;



        if (this.x < 0 || this.x > this.w - this.radius) {
            return false;
        }

        if (this.y < 0 || this.y > this.h - this.radius) {
            return false;
        }
        this.render()
        this.progress++
            return true;
    }
}