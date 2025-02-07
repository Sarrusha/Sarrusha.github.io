const canvas = document.getElementById('sakuraCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to match the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to store sakura petals
const petals = [];
const totalPetals = 50; // Number of petals

// Sakura petal class
class Petal {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 10 + 5; // Random size between 5 and 15
        this.speed = Math.random() * 1 + 0.5; // Random speed
        this.angle = Math.random() * 360; // Random angle
        this.rotationSpeed = Math.random() * 0.02 - 0.01; // Random rotation speed
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle * Math.PI) / 180);
        ctx.fillStyle = 'rgba(255, 182, 193, 0.8)'; // Light pink color
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size, -this.size / 2, -this.size / 2, -this.size, 0, -this.size);
        ctx.bezierCurveTo(this.size / 2, -this.size, this.size, -this.size / 2, 0, 0);
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.y += this.speed;
        this.angle += this.rotationSpeed;

        // Reset position when petal goes off-screen
        if (this.y > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }
    }
}

// Initialize petals
for (let i = 0; i < totalPetals; i++) {
    petals.push(new Petal());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    petals.forEach(petal => {
        petal.update();
        petal.draw();
    });
    requestAnimationFrame(animate);
}

animate();

// Handle window resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
