$(document).ready(function() {

    let maxParticles = 1200;
    let particles = [];
    let frequency = 20;
    let init_num = maxParticles;
    let maxTime = frequency * maxParticles;
    let timeToRecreate = false;
    const data = createCanvas();
    let bodyCanvas = data[0];
    let canvas = data[1];


    // Enable Repopulate
    setTimeout(function() {
        timeToRecreate = true;
    }.bind(this), maxTime)

    // Populate particles
    populate(maxParticles);

    // Function: Create Canvas
    function createCanvas() {
        let bodyCanvas = document.createElement('canvas');
        bodyCanvas.width = $(window).width();
        bodyCanvas.height = $(window).height();
        $('body').append(bodyCanvas);
        let canvas = bodyCanvas.getContext('2d');
        return [bodyCanvas, canvas];
    }

    // Function: Populate Canvas
    function populate(num) {
        for (let i = 0; i < num; i++) {
            setTimeout(
                function(x) {
                    return function() {
                        let random = Math.random();

                        // Set type of plankton
                        let type = new FishLarva(canvas);
                        if (!timeToRecreate) {
                            if (random > 0.97) {
                                type = new FishEgg(canvas);
                            }
                            if (random < 0.1 && random > 0) {
                                type = new Paramecium(canvas);
                            }
                        }
                        if (random > 0.1 && random < 0.8) {
                            type = new FishLarvaEgg(canvas);
                        }
                        // Add particle
                        particles.push(type);
                    };
                }(i),
                frequency * i);
        }
        return particles.length;
    }

    // Function: Clear Canvas
    function clear() {
        let gradient = canvas.createRadialGradient(
            bodyCanvas.width / 2,
            bodyCanvas.height / 2,
            0,
            bodyCanvas.width / 2,
            bodyCanvas.height / 2,
            bodyCanvas.width
        )

        // Background Color
        gradient.addColorStop(0, "rgba(10, 18, 64, 0.12 )");
        gradient.addColorStop(1, "rgba(10, 19, 38, 0.01)");

        // Fill with gradient
        canvas.fillStyle = gradient;
        canvas.fillRect(0, 0, bodyCanvas.width, bodyCanvas.height);
    }

    // Function: Update Canvas
    function update() {
        clear();
        particles = particles.filter(function(p) {
                return p.move();
            })
            // Recreate Particles
        if (timeToRecreate) {
            if (particles.length < init_num) {
                populate(1);
            }
        }
        requestAnimationFrame(update.bind(this));
    }

    update();
})